import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'bed-sheets',
    name: 'Bed Sheets',
    slug: 'bed-sheets',
    subcategories: [
      { id: 'cotton-sheets', name: 'Cotton Bed Sheets', slug: 'cotton-bed-sheets' },
      { id: 'satin-sheets', name: 'Satin Bed Sheets', slug: 'satin-bed-sheets' },
      { id: 'silk-sheets', name: 'Silk Bed Sheets', slug: 'silk-bed-sheets' },
      { id: 'linen-sheets', name: 'Linen Bed Sheets', slug: 'linen-bed-sheets' },
      { id: 'microfiber-sheets', name: 'Microfiber Bed Sheets', slug: 'microfiber-bed-sheets' },
    ],
  },
  {
    id: 'pillow-covers',
    name: 'Pillow Covers',
    slug: 'pillow-covers',
    subcategories: [
      { id: 'standard-pillow', name: 'Standard Pillow Covers', slug: 'standard-pillow-covers' },
      { id: 'king-pillow', name: 'King Pillow Covers', slug: 'king-pillow-covers' },
      { id: 'decorative-pillow', name: 'Decorative Pillow Covers', slug: 'decorative-pillow-covers' },
      { id: 'satin-pillow', name: 'Satin Pillow Covers', slug: 'satin-pillow-covers' },
      { id: 'silk-pillow', name: 'Silk Pillow Covers', slug: 'silk-pillow-covers' },
    ],
  },
  {
    id: 'complete-sets',
    name: 'Complete Sets',
    slug: 'complete-sets',
    subcategories: [
      { id: '3-piece-sets', name: '3-Piece Sets', slug: '3-piece-sets' },
      { id: '6-piece-sets', name: '6-Piece Sets', slug: '6-piece-sets' },
      { id: '8-piece-sets', name: '8-Piece Sets', slug: '8-piece-sets' },
      { id: 'luxury-collections', name: 'Luxury Collections', slug: 'luxury-collections' },
    ],
  },
  {
    id: 'comforters-quilts',
    name: 'Comforters & Quilts',
    slug: 'comforters-quilts',
    subcategories: [
      { id: 'lightweight', name: 'Lightweight', slug: 'lightweight' },
      { id: 'heavyweight', name: 'Heavyweight', slug: 'heavyweight' },
      { id: 'all-season', name: 'All-Season', slug: 'all-season' },
    ],
  },
  {
    id: 'bedding-accessories',
    name: 'Bedding Accessories',
    slug: 'bedding-accessories',
    subcategories: [
      { id: 'mattress-protectors', name: 'Mattress Protectors', slug: 'mattress-protectors' },
      { id: 'bed-skirts', name: 'Bed Skirts', slug: 'bed-skirts' },
      { id: 'throws-blankets', name: 'Throws & Blankets', slug: 'throws-blankets' },
    ],
  },
];
