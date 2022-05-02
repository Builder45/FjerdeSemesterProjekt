// See https://aka.ms/new-console-template for more information
using SecureWebshop.Domain.Entities;
using SecureWebshop.Persistence.Context;
using SecureWebshop.Persistence.Repositories;

Console.WriteLine("Hello, World!");

RavenDbContext context = new RavenDbContext();
GenericRepo<User> repo = new GenericRepo<User>(context);