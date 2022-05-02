using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.UseCases.UserUC;
using SecureWebshop.Persistence.Context;
using SecureWebshop.Persistence.Repositories;
using SecureWebshop.Persistence.Settings;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 
builder.Services.AddSingleton<IRavenDbContext, RavenDbContext>();
builder.Services.AddSingleton(typeof(IGenericRepo<>), typeof(GenericRepo<>));

builder.Services.AddScoped<ICreateUser, CreateUser>();

// Kobling mellem appsettings og persistence-laget, så der kan forbindes til RavenDB
builder.Services.Configure<PersistenceSettings>(builder.Configuration.GetSection("RavenDB"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
