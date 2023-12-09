using MediaLibrary.BLL.Extensions;
using MediaLibrary.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureServices(builder.Configuration);
builder.Services.ConfigureAPIServices();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("localhost:4200",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200");
        });
    });
}

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
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("localhost:4200");
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
