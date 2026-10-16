using System.Security.Claims;
using EcomApi.Data;
using EcomApi.Dtos;
using EcomApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcomApi.Controllers;

[ApiController]
[Route("api/cart")]
[Authorize]
public class CartController(AppDbContext db) : ControllerBase
{
    private int CurrentUserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<List<CartItemDto>>> GetCart()
    {
        return Ok(await LoadCart());
    }

    [HttpPost("items")]
    public async Task<ActionResult<List<CartItemDto>>> AddItem(AddToCartRequest request)
    {
        if (request.Quantity < 1)
        {
            return BadRequest(new { error = "Quantity must be at least 1." });
        }

        var productExists = await db.Products.AnyAsync(p => p.Id == request.ProductId);
        if (!productExists)
        {
            return NotFound(new { error = "Product not found." });
        }

        var existing = await db.CartItems.FirstOrDefaultAsync(c =>
            c.UserId == CurrentUserId && c.ProductId == request.ProductId && c.Size == request.Size);

        if (existing is not null)
        {
            existing.Quantity += request.Quantity;
        }
        else
        {
            db.CartItems.Add(new CartItem
            {
                UserId = CurrentUserId,
                ProductId = request.ProductId,
                Size = request.Size,
                Quantity = request.Quantity,
            });
        }

        await db.SaveChangesAsync();
        return Ok(await LoadCart());
    }

    [HttpPut("items/{id:int}")]
    public async Task<ActionResult<List<CartItemDto>>> UpdateItem(int id, UpdateCartItemRequest request)
    {
        if (request.Quantity < 1)
        {
            return BadRequest(new { error = "Quantity must be at least 1." });
        }

        var item = await db.CartItems.FirstOrDefaultAsync(c => c.Id == id && c.UserId == CurrentUserId);
        if (item is null)
        {
            return NotFound();
        }

        item.Quantity = request.Quantity;
        await db.SaveChangesAsync();
        return Ok(await LoadCart());
    }

    [HttpDelete("items/{id:int}")]
    public async Task<ActionResult<List<CartItemDto>>> RemoveItem(int id)
    {
        var item = await db.CartItems.FirstOrDefaultAsync(c => c.Id == id && c.UserId == CurrentUserId);
        if (item is null)
        {
            return NotFound();
        }

        db.CartItems.Remove(item);
        await db.SaveChangesAsync();
        return Ok(await LoadCart());
    }

    [HttpPost("merge")]
    public async Task<ActionResult<List<CartItemDto>>> Merge(MergeCartRequest request)
    {
        if (request.Items.Count == 0)
        {
            return Ok(await LoadCart());
        }

        var productIds = request.Items.Select(i => i.ProductId).ToHashSet();
        var validProductIds = await db.Products
            .Where(p => productIds.Contains(p.Id))
            .Select(p => p.Id)
            .ToHashSetAsync();

        var existingItems = await db.CartItems
            .Where(c => c.UserId == CurrentUserId)
            .ToListAsync();

        foreach (var line in request.Items)
        {
            if (!validProductIds.Contains(line.ProductId) || line.Quantity < 1)
            {
                continue;
            }

            var existing = existingItems.FirstOrDefault(c => c.ProductId == line.ProductId && c.Size == line.Size);
            if (existing is not null)
            {
                existing.Quantity += line.Quantity;
            }
            else
            {
                var newItem = new CartItem
                {
                    UserId = CurrentUserId,
                    ProductId = line.ProductId,
                    Size = line.Size,
                    Quantity = line.Quantity,
                };
                db.CartItems.Add(newItem);
                existingItems.Add(newItem);
            }
        }

        await db.SaveChangesAsync();
        return Ok(await LoadCart());
    }

    private async Task<List<CartItemDto>> LoadCart()
    {
        return await db.CartItems
            .Where(c => c.UserId == CurrentUserId)
            .OrderBy(c => c.Id)
            .Select(c => new CartItemDto(
                c.Id,
                c.ProductId,
                c.Product.Name,
                c.Product.Price,
                c.Product.SalePrice,
                c.Product.ImageUrl,
                c.Size,
                c.Quantity))
            .ToListAsync();
    }
}
