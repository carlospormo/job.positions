using Job.Positions.Api.Models;
using System.Collections.Generic;

namespace Job.Positions.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Position> Positions { get; set; }
}
