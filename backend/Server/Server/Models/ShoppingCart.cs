﻿using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool Temporal { get; set; }
        public ICollection<CartContent> CartContent { get; set; } = new List<CartContent>();
        public ICollection<TemporalOrder> TemporalOrders { get; set; } = new List<TemporalOrder>();
        public bool Finished { get; set; }

    }
}
