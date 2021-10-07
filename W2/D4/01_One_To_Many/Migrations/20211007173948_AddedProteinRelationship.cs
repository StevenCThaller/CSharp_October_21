using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _01_One_To_Many.Migrations
{
    public partial class AddedProteinRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Proteins",
                columns: table => new
                {
                    ProteinId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proteins", x => x.ProteinId);
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
                    Toppings = table.Column<int>(nullable: false),
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

            migrationBuilder.CreateIndex(
                name: "IX_Tacos_ProteinId",
                table: "Tacos",
                column: "ProteinId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tacos");

            migrationBuilder.DropTable(
                name: "Proteins");
        }
    }
}
