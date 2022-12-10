using MediaLibrary.BLL.Extensions;
using Microsoft.Extensions.FileProviders;
using MediaLibrary.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureServices(builder.Configuration);
builder.Services.ConfigureAPIServices();

var app = builder.Build();

//add this at the start of Configure
app.Use(async (HttpContext context, Func<Task> next) =>
{
    await next.Invoke();

    if (context.Response.StatusCode == 404)
    {
        context.Request.Path = new PathString("/index.html");
        await next.Invoke();
    }
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    var staticFilesPath = Path.Combine(builder.Environment.ContentRootPath, builder.Configuration["StaticFilesPath"]!);

    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDefaultFiles(new DefaultFilesOptions
    {
        FileProvider = new PhysicalFileProvider(staticFilesPath)
    });
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(staticFilesPath)
    });
} else
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
