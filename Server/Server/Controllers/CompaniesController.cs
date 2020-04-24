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
    public class CompaniesController : ControllerBase
    {
        private readonly CompanyContext _context;
        
       
        public CompaniesController(CompanyContext context)
        {
        
            _context = context;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyItem>>> GetCompany()
        {
            return await _context.Company.ToListAsync();
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyItem>> GetCompanyItem(int id)
        {
            var companyItem = await _context.Company.FindAsync(id);

            if (companyItem == null)
            {
                return NotFound();
            }

            return companyItem;
        }

        // PUT: api/Companies/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyItem(int id, CompanyItem companyItem)
        {
            if (id != companyItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(companyItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyItemExists(id))
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

        // POST: api/Companies
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<CompanyItem>> PostCompanyItem(CompanyItem companyItem)
        {
            _context.Company.Add(companyItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompanyItem", new { id = companyItem.Id }, companyItem);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CompanyItem>> DeleteCompanyItem(int id)
        {
            var companyItem = await _context.Company.FindAsync(id);
            if (companyItem == null)
            {
                return NotFound();
            }

            _context.Company.Remove(companyItem);
            await _context.SaveChangesAsync();

            return companyItem;
        }

        private bool CompanyItemExists(int id)
        {
            return _context.Company.Any(e => e.Id == id);
        }
    }
}
