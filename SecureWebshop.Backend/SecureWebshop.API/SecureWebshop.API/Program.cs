using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.UseCases.UserUC;
using SecureWebshop.Persistence.Context;
using SecureWebshop.Persistence.Repositories;
using SecureWebshop.Persistence.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SecureWebshop.Application.Helpers;
using SecureWebshop.Application.Services.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "", Version = "v1" });

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
            ValidIssuer = builder.Configuration.GetSection("JWT:Issuer").Value,
            ValidAudience = builder.Configuration.GetSection("JWT:Audience").Value,
            IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(builder.Configuration.GetSection("JWT:Key").Value))
        };
    });

builder.Services.AddAuthorization();

//// Opsætning af authentication metoden:
//var jwtKey = builder.Configuration.GetSection("JWT:Key").Value;
//var tokenValParams = new TokenValidationParameters
//{
//    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
//    ValidateLifetime = true,
//    ValidateAudience = false,
//    ValidateIssuer = false,
//    ClockSkew = TimeSpan.Zero
//};
//builder.Services.AddSingleton(tokenValParams);

//// Authentication metoden tages i brug:
//builder.Services.AddAuthentication(authOptions =>
//{
//    authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//    .AddJwtBearer(jwtOptions =>
//    {
//        jwtOptions.TokenValidationParameters = tokenValParams;
//    }
//);

// 
builder.Services.AddSingleton<IRavenDbContext, RavenDbContext>();
builder.Services.AddSingleton(typeof(IGenericRepo<>), typeof(GenericRepo<>));
builder.Services.AddSingleton(typeof(IUserRepo), typeof(UserRepo));

builder.Services.AddSingleton(typeof(ITokenHelper), typeof(TokenHelper));

builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<IAuthService, AuthService>();

builder.Services.AddScoped<ICreateUser, CreateUser>();
builder.Services.AddScoped<IGetUser, GetUser>();

// Kobling mellem appsettings og persistence-laget, så der kan forbindes til RavenDB
builder.Services.Configure<PersistenceSettings>(builder.Configuration.GetSection("RavenDB"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
