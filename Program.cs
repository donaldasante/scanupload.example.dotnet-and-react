using ScanUpload.Api.Client.Extensions;
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
                .WithOrigins("http://localhost:3002", "http://react-client:3002") // React default port
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

//app.UseStaticFiles();
app.UseRouting();

// Serve React app
app.MapFallbackToFile("index.html");

app.Run();
