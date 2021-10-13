﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using _01_One_To_Many.Models;

namespace _01_One_To_Many.Migrations
{
    [DbContext(typeof(TaContext))]
    [Migration("20211007173948_AddedProteinRelationship")]
    partial class AddedProteinRelationship
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("_01_One_To_Many.Models.Protein", b =>
                {
                    b.Property<int>("ProteinId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("ProteinId");

                    b.ToTable("Proteins");
                });

            modelBuilder.Entity("_01_One_To_Many.Models.Taco", b =>
                {
                    b.Property<int>("TacoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Cheese")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("ProteinId")
                        .HasColumnType("int");

                    b.Property<int?>("Toppings")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("Tortilla")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("TacoId");

                    b.HasIndex("ProteinId");

                    b.ToTable("Tacos");
                });

            modelBuilder.Entity("_01_One_To_Many.Models.Taco", b =>
                {
                    b.HasOne("_01_One_To_Many.Models.Protein", "Protein")
                        .WithMany("Tacos")
                        .HasForeignKey("ProteinId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}