using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //處理CORS問題
            services.AddCors(options => options.AddPolicy("FrontPolicy", builder =>
            {
                builder.AllowAnyMethod()
               .SetIsOriginAllowed(_ => true)
               .AllowAnyHeader()
               .AllowCredentials();
            }));

            //services.AddCors(options => options.AddPolicy("FrontPolicy", builder =>
            //{
            //    builder.WithOrigins("http//127.0.0.1:3000")
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()
            //    .AllowCredentials();
            //}));


            //建立CompanyContext ，測試階段用MemoryDB
            services.AddMvc();
            services.AddDbContext<CompanyContext>(opt =>
              //opt.UseInMemoryDatabase("CompanyList")
              opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            );

            //建立CustomContext
            services.AddDbContext<CustomContext>(opt =>
               // opt.UseInMemoryDatabase("CustomList")
               opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            );

            //Controller
            services.AddControllers();
            // MVC to Database
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,CompanyContext _company)
        {
            app.UseCors("FrontPolicy");
          
            //產生Table
            _company.Database.EnsureCreated();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
