using SecureWebshop.Application.Repositories;
using SecureWebshop.Persistence.Context;
using SecureWebshop.Persistence.Repositories;
using SecureWebshop.Persistence.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SecureWebshop.Application.Helpers;
using SecureWebshop.Application.Services.Auth;
using Microsoft.AspNetCore.Cors;
using SecureWebshop.Application.Services.Users;
using SecureWebshop.Application.Services.Products;
using SecureWebshop.API;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "SecureWebshop", Version = "v1" });

    // Tilføjer mulighed for at bruge Bearer authentication sammen med Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Uses Bearer tokens!",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = builder.Configuration.GetSection("JWT:Issuer").Value,
            ValidAudience = builder.Configuration.GetSection("JWT:Audience").Value,
            IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(builder.Configuration.GetSection("JWT:Key").Value))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddSingleton<IRavenDbContext, RavenDbContext>();
builder.Services.AddSingleton(typeof(IGenericRepo<>), typeof(GenericRepo<>));
builder.Services.AddSingleton(typeof(IUserRepo), typeof(UserRepo));

builder.Services.AddSingleton(typeof(ITokenHelper), typeof(TokenHelper));

builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IProductService, ProductService>();

// Kobling mellem appsettings og persistence-laget, så der kan forbindes til RavenDB
builder.Services.Configure<PersistenceSettings>(builder.Configuration.GetSection("RavenDB"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.WithOrigins("http://localhost:3000");
    options.AllowAnyHeader();
    options.AllowAnyMethod();
});

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
