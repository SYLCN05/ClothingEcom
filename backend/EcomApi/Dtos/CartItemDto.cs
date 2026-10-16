namespace EcomApi.Dtos;

public record CartItemDto(
    int Id,
    int ProductId,
    string Name,
    decimal Price,
    decimal? SalePrice,
    string ImageUrl,
    string Size,
    int Quantity);
