using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EcomApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Category = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    SalePrice = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    Stock = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Variant = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Composition = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    Sizes = table.Column<string[]>(type: "text[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Composition", "Description", "Name", "Price", "SalePrice", "Sizes", "Stock", "Variant" },
                values: new object[,]
                {
                    { 1, "Women / Outerwear", "80% Wool, 20% Polyamide", "A relaxed, oversized coat cut from a heavyweight wool blend. Dropped shoulders, side pockets, and a single-button closure.", "Oversized Wool Coat", 129.9m, null, new[] { "XS", "S", "M", "L", "XL" }, "in-stock", "coat" },
                    { 2, "Women / Skirts", "100% Polyester", "A fluid pleated midi skirt with an elasticated waistband. Falls just below the knee for easy movement.", "Pleated Midi Skirt", 49.9m, 34.9m, new[] { "XS", "S", "M", "L" }, "low-stock", "skirt" },
                    { 3, "Men / Shirts", "100% Cotton", "A crisp poplin shirt with a classic collar and regular fit. Finished with mother-of-pearl buttons.", "Cotton Poplin Shirt", 39.9m, null, new[] { "S", "M", "L", "XL" }, "in-stock", "shirt" },
                    { 4, "Women / Trousers", "68% Viscose, 30% Polyester, 2% Elastane", "High-rise tailored trousers with a wide, fluid leg and a concealed front closure. Fully lined.", "Tailored Wide-Leg Trousers", 59.9m, null, new[] { "XS", "S", "M", "L" }, "in-stock", "trousers" },
                    { 5, "Women / Knitwear", "55% Cotton, 45% Acrylic", "A fine-ribbed pullover with a round neckline and dropped shoulder seams. Soft, year-round weight.", "Ribbed Knit Sweater", 45.9m, null, new[] { "XS", "S", "M", "L", "XL" }, "out-of-stock", "sweater" },
                    { 6, "Men / Outerwear", "100% Cotton", "A water-resistant trench jacket with a tie belt, storm flap, and welt pockets. Lightly structured shoulders.", "Belted Trench Jacket", 99.9m, null, new[] { "S", "M", "L", "XL" }, "in-stock", "jacket" },
                    { 7, "Men / Blazers", "55% Linen, 45% Viscose", "An unstructured blazer in a breathable linen blend. Notched lapel, two-button closure, single back vent.", "Linen-Blend Blazer", 89.9m, 69.9m, new[] { "S", "M", "L", "XL" }, "low-stock", "jacket" },
                    { 8, "Men / Denim", "100% Cotton", "Mid-rise straight-leg jeans in a rigid, non-stretch denim that softens with wear.", "Straight-Leg Jeans", 55.9m, null, new[] { "28", "30", "32", "34", "36" }, "in-stock", "trousers" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
