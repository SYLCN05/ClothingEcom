namespace EcomApi.Dtos;

public record ProductDto(
    int Id,
    string Name,
    string Category,
    decimal Price,
    decimal? SalePrice,
    string Stock,
    string Variant,
    string Description,
    string Composition,
    string[] Sizes,
    string ImageUrl);
