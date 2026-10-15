using Microsoft.EntityFrameworkCore;

namespace EcomApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
}
