using ScanUpload.Api.Client.Extensions;
using ScanUpload.Api.Client.Interface;
using ScanUpload.Api.Client.KeycloakIntegration;
using ScanUpload.Api.Client.Proxy;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Use scanupload proxy
builder.Services.Configure<ScanUploadProxyOptions>(
    builder.Configuration.GetSection("ScanUploadProxy")
);

builder.Services.AddScanUploadProxy(builder.Configuration.GetSection("ScanUploadProxy").Bind, builder =>
{
    builder.AddStandardResilienceHandler();
});

builder.Services.AddScanUploadApiClient(builder.Configuration, builder =>
{
    builder.AddStandardResilienceHandler();
});

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "ReactApp",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:3002",
                    "http://scanupload.react.example.client:3002"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }
    );
});

var app = builder.Build();

app.UseScanUploadProxy();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("ReactApp");

app.UseRouting();

app.MapGet(
    "/download-file/{sessionId}",
    async (string sessionId, IScanUploadApiClient scanUploadApiClient, CancellationToken cancellationToken) =>
    {
        try
        {
            var outputStream = new MemoryStream();
            bool filesReceived = false;

            using (var archive = new System.IO.Compression.ZipArchive(outputStream, System.IO.Compression.ZipArchiveMode.Create, leaveOpen: true))
            {
                await scanUploadApiClient.DownloadAsync(sessionId, async (name, stream, ct) =>
                {
                    Console.WriteLine($"Received file: {name}");
                    var entry = archive.CreateEntry(name);
                    using (var entryStream = entry.Open())
                    {
                        await stream.CopyToAsync(entryStream, ct);
                    }
                    filesReceived = true;
                }, cancellationToken);
            }

            if (!filesReceived)
            {
                return Results.NotFound(new { error = "No files found for the given session ID" });
            }

            outputStream.Position = 0;
            return Results.File(outputStream, "application/zip", $"{sessionId}.zip");
        }
        catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.Conflict)
        {
            return Results.Conflict(new { error = "Session unavailable or already processed" });
        }
        catch (KeycloakException ex)
        {
            return Results.BadRequest(new { error = ex.Message });
        }
    }
);

await app.RunAsync();
