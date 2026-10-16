namespace EcomApi.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? SalePrice { get; set; }

    // one of: "in-stock" | "low-stock" | "out-of-stock"
    public string Stock { get; set; } = "in-stock";

    // GarmentVariant key used by the frontend's SVG illustration component
    public string Variant { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Composition { get; set; } = string.Empty;
    public string[] Sizes { get; set; } = [];
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsNew { get; set; }
}
