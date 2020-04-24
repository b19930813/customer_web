using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomsController : ControllerBase
    {
        private readonly CustomContext _context;
        private readonly CompanyContext _company_context;

        public CustomsController(CustomContext context)
        {
            _context = context;
            
        }

        // GET: api/Customs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Custom>>> GetCustom()
        {
            return await _context.Custom.ToListAsync();
        }

        // GET: api/Customs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Custom>> GetCustom(int id)
        {
            var custom = await _context.Custom.FindAsync(id);

            if (custom == null)
            {
                return NotFound();
            }

            return custom;
        }


        [Route("findByCompany/{companyId}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Custom>>> GetCustomByCompanyId(int companyId)
        {
            return await _context.Custom.Where(custom => custom.CompanyId == companyId).ToListAsync();
        }

        [Route("findByConfition")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Custom>>> GetCustomByCondition([FromBody] Custom custom)
        {
            return await _context.Custom.ToListAsync();
        }
        // PUT: api/Customs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustom(int id, Custom custom)
        {
            if (id != custom.Id)
            {
                return BadRequest();
            }

            _context.Entry(custom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Customs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Custom>> PostCustom(Custom custom)
        {
            //Create myCustom to insert
      
            _context.Custom.Add(custom);
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustom", new { id = custom.Id }, custom);
        }

        // DELETE: api/Customs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Custom>> DeleteCustom(int id)
        {
            var custom = await _context.Custom.FindAsync(id);
            if (custom == null)
            {
                return NotFound();
            }

            _context.Custom.Remove(custom);
            await _context.SaveChangesAsync();

            return custom;
        }

        private bool CustomExists(int id)
        {
            return _context.Custom.Any(e => e.Id == id);
        }
    }
}
