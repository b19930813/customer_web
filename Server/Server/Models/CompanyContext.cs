using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class CompanyContext:DbContext
    {
        public CompanyContext(DbContextOptions<CompanyContext> options)
           : base(options)
        {
           
        }
        public DbSet<CompanyItem> Company { get; set; }
        public DbSet<Custom> Custom { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Custom>()
                .HasOne<CompanyItem>(s => s.Comany)
                .WithMany(g => g.Custom);

            modelBuilder.Entity<CompanyItem>()
                .HasMany<Custom>(s => s.Custom)
                .WithOne(g => g.Comany);
        }

    }
}
