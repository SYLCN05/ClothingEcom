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
    private const int MaxQuantityPerLine = 10;

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

        var product = await db.Products.FirstOrDefaultAsync(p => p.Id == request.ProductId);
        if (product is null)
        {
            return NotFound(new { error = "Product not found." });
        }

        if (product.Stock == "out-of-stock")
        {
            return BadRequest(new { error = "This product is out of stock." });
        }

        if (!product.Sizes.Contains(request.Size))
        {
            return BadRequest(new { error = "Invalid size for this product." });
        }

        var existing = await db.CartItems.FirstOrDefaultAsync(c =>
            c.UserId == CurrentUserId && c.ProductId == request.ProductId && c.Size == request.Size);

        var newQuantity = (existing?.Quantity ?? 0) + request.Quantity;
        if (newQuantity > MaxQuantityPerLine)
        {
            return BadRequest(new { error = $"Quantity cannot exceed {MaxQuantityPerLine} per item." });
        }

        if (existing is not null)
        {
            existing.Quantity = newQuantity;
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

        if (request.Quantity > MaxQuantityPerLine)
        {
            return BadRequest(new { error = $"Quantity cannot exceed {MaxQuantityPerLine} per item." });
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
        var products = await db.Products
            .Where(p => productIds.Contains(p.Id))
            .ToDictionaryAsync(p => p.Id);

        var existingItems = await db.CartItems
            .Where(c => c.UserId == CurrentUserId)
            .ToListAsync();

        foreach (var line in request.Items)
        {
            if (!products.TryGetValue(line.ProductId, out var product) ||
                line.Quantity < 1 ||
                product.Stock == "out-of-stock" ||
                !product.Sizes.Contains(line.Size))
            {
                continue;
            }

            var existing = existingItems.FirstOrDefault(c => c.ProductId == line.ProductId && c.Size == line.Size);
            if (existing is not null)
            {
                existing.Quantity = Math.Min(existing.Quantity + line.Quantity, MaxQuantityPerLine);
            }
            else
            {
                var newItem = new CartItem
                {
                    UserId = CurrentUserId,
                    ProductId = line.ProductId,
                    Size = line.Size,
                    Quantity = Math.Min(line.Quantity, MaxQuantityPerLine),
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
