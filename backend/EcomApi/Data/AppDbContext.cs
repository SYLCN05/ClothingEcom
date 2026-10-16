using EcomApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EcomApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Name).IsRequired().HasMaxLength(200);
            entity.Property(p => p.Category).IsRequired().HasMaxLength(200);
            entity.Property(p => p.Price).HasPrecision(10, 2);
            entity.Property(p => p.SalePrice).HasPrecision(10, 2);
            entity.Property(p => p.Stock).IsRequired().HasMaxLength(20);
            entity.Property(p => p.Variant).IsRequired().HasMaxLength(20);
            entity.Property(p => p.Description).IsRequired();
            entity.Property(p => p.Composition).IsRequired().HasMaxLength(300);
            entity.Property(p => p.Sizes).HasColumnType("text[]");
            entity.Property(p => p.ImageUrl).IsRequired();

            entity.HasData(
                new Product
                {
                    Id = 1,
                    Name = "Oversized Wool Coat",
                    Category = "Women / Outerwear",
                    Price = 129.9m,
                    Stock = "in-stock",
                    Variant = "coat",
                    Description = "A relaxed, oversized coat cut from a heavyweight wool blend. Dropped shoulders, side pockets, and a single-button closure.",
                    Composition = "80% Wool, 20% Polyamide",
                    Sizes = ["XS", "S", "M", "L", "XL"],
                    ImageUrl = "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80&fit=crop&auto=format",
                    IsNew = true,
                },
                new Product
                {
                    Id = 2,
                    Name = "Pleated Midi Skirt",
                    Category = "Women / Skirts",
                    Price = 49.9m,
                    SalePrice = 34.9m,
                    Stock = "low-stock",
                    Variant = "skirt",
                    Description = "A fluid pleated midi skirt with an elasticated waistband. Falls just below the knee for easy movement.",
                    Composition = "100% Polyester",
                    Sizes = ["XS", "S", "M", "L"],
                    ImageUrl = "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?w=800&q=80&fit=crop&auto=format",
                },
                new Product
                {
                    Id = 3,
                    Name = "Cotton Poplin Shirt",
                    Category = "Men / Shirts",
                    Price = 39.9m,
                    Stock = "in-stock",
                    Variant = "shirt",
                    Description = "A crisp poplin shirt with a classic collar and regular fit. Finished with mother-of-pearl buttons.",
                    Composition = "100% Cotton",
                    Sizes = ["S", "M", "L", "XL"],
                    ImageUrl = "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80&fit=crop&auto=format",
                },
                new Product
                {
                    Id = 4,
                    Name = "Tailored Wide-Leg Trousers",
                    Category = "Women / Trousers",
                    Price = 59.9m,
                    Stock = "in-stock",
                    Variant = "trousers",
                    Description = "High-rise tailored trousers with a wide, fluid leg and a concealed front closure. Fully lined.",
                    Composition = "68% Viscose, 30% Polyester, 2% Elastane",
                    Sizes = ["XS", "S", "M", "L"],
                    ImageUrl = "https://images.unsplash.com/photo-1687825515654-23620796760c?w=800&q=80&fit=crop&auto=format",
                },
                new Product
                {
                    Id = 5,
                    Name = "Ribbed Knit Sweater",
                    Category = "Women / Knitwear",
                    Price = 45.9m,
                    Stock = "out-of-stock",
                    Variant = "sweater",
                    Description = "A fine-ribbed pullover with a round neckline and dropped shoulder seams. Soft, year-round weight.",
                    Composition = "55% Cotton, 45% Acrylic",
                    Sizes = ["XS", "S", "M", "L", "XL"],
                    ImageUrl = "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=800&q=80&fit=crop&auto=format",
                    IsNew = true,
                },
                new Product
                {
                    Id = 6,
                    Name = "Belted Trench Jacket",
                    Category = "Men / Outerwear",
                    Price = 99.9m,
                    Stock = "in-stock",
                    Variant = "jacket",
                    Description = "A water-resistant trench jacket with a tie belt, storm flap, and welt pockets. Lightly structured shoulders.",
                    Composition = "100% Cotton",
                    Sizes = ["S", "M", "L", "XL"],
                    ImageUrl = "https://images.unsplash.com/photo-1676716105765-e19fe6a01851?w=800&q=80&fit=crop&auto=format",
                    IsNew = true,
                },
                new Product
                {
                    Id = 7,
                    Name = "Linen-Blend Blazer",
                    Category = "Men / Blazers",
                    Price = 89.9m,
                    SalePrice = 69.9m,
                    Stock = "low-stock",
                    Variant = "jacket",
                    Description = "An unstructured blazer in a breathable linen blend. Notched lapel, two-button closure, single back vent.",
                    Composition = "55% Linen, 45% Viscose",
                    Sizes = ["S", "M", "L", "XL"],
                    ImageUrl = "https://images.unsplash.com/photo-1740710370552-a49b5b01f80a?w=800&q=80&fit=crop&auto=format",
                },
                new Product
                {
                    Id = 8,
                    Name = "Straight-Leg Jeans",
                    Category = "Men / Denim",
                    Price = 55.9m,
                    Stock = "in-stock",
                    Variant = "trousers",
                    Description = "Mid-rise straight-leg jeans in a rigid, non-stretch denim that softens with wear.",
                    Composition = "100% Cotton",
                    Sizes = ["28", "30", "32", "34", "36"],
                    ImageUrl = "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80&fit=crop&auto=format",
                    IsNew = true,
                }
            );
        });
    }
}
