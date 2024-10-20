﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace MediaLibrary.DAL.Models;

[Table("Album")]
public partial class Album
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(150)]
    [Unicode(false)]
    public string Title { get; set; }

    public int? ArtistId { get; set; }

    public int? Year { get; set; }

    public int? GenreId { get; set; }

    public DateTime CreateDate { get; set; }

    public DateTime ModifyDate { get; set; }

    [ForeignKey("ArtistId")]
    [InverseProperty("Albums")]
    public virtual Artist Artist { get; set; }

    [ForeignKey("GenreId")]
    [InverseProperty("Albums")]
    public virtual Genre Genre { get; set; }

    [InverseProperty("Album")]
    public virtual ICollection<Track> Tracks { get; set; } = new List<Track>();
}