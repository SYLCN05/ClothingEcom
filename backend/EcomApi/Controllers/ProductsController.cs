using EcomApi.Data;
using EcomApi.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcomApi.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetAll()
    {
        var products = await db.Products
            .OrderBy(p => p.Id)
            .Select(p => new ProductDto(p.Id, p.Name, p.Category, p.Price, p.SalePrice, p.Stock, p.Description, p.Composition, p.Sizes, p.ImageUrl, p.IsNew))
            .ToListAsync();


        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var product = await db.Products
            .Where(p => p.Id == id)
            .Select(p => new ProductDto(p.Id, p.Name, p.Category, p.Price, p.SalePrice, p.Stock, p.Description, p.Composition, p.Sizes, p.ImageUrl, p.IsNew))
            .FirstOrDefaultAsync();

        return product is null ? NotFound() : Ok(product);
    }
}
