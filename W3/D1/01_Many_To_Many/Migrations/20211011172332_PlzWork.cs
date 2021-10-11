using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _01_Many_To_Many.Migrations
{
    public partial class PlzWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Proteins",
                columns: table => new
                {
                    ProteinId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proteins", x => x.ProteinId);
                });

            migrationBuilder.CreateTable(
                name: "Topping",
                columns: table => new
                {
                    ToppingId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topping", x => x.ToppingId);
                });

            migrationBuilder.CreateTable(
                name: "Tacos",
                columns: table => new
                {
                    TacoId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Cheese = table.Column<string>(nullable: false),
                    Tortilla = table.Column<string>(nullable: false),
                    ProteinId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tacos", x => x.TacoId);
                    table.ForeignKey(
                        name: "FK_Tacos_Proteins_ProteinId",
                        column: x => x.ProteinId,
                        principalTable: "Proteins",
                        principalColumn: "ProteinId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TacosHaveToppings",
                columns: table => new
                {
                    TacoHasToppingsId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TacoId = table.Column<int>(nullable: false),
                    ToppingId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TacosHaveToppings", x => x.TacoHasToppingsId);
                    table.ForeignKey(
                        name: "FK_TacosHaveToppings_Tacos_TacoId",
                        column: x => x.TacoId,
                        principalTable: "Tacos",
                        principalColumn: "TacoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TacosHaveToppings_Topping_ToppingId",
                        column: x => x.ToppingId,
                        principalTable: "Topping",
                        principalColumn: "ToppingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tacos_ProteinId",
                table: "Tacos",
                column: "ProteinId");

            migrationBuilder.CreateIndex(
                name: "IX_TacosHaveToppings_TacoId",
                table: "TacosHaveToppings",
                column: "TacoId");

            migrationBuilder.CreateIndex(
                name: "IX_TacosHaveToppings_ToppingId",
                table: "TacosHaveToppings",
                column: "ToppingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TacosHaveToppings");

            migrationBuilder.DropTable(
                name: "Tacos");

            migrationBuilder.DropTable(
                name: "Topping");

            migrationBuilder.DropTable(
                name: "Proteins");
        }
    }
}
