using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class CustomContext:DbContext
    {
        public CustomContext(DbContextOptions<CustomContext> options)
            : base(options)
        { }
        public DbSet<Custom> Custom { get; set; }

    }

}
