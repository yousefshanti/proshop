import { Link } from 'react-router-dom'
import DataTable from '../components/DataTable'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { deleteProduct } from '../store/productsSlice'
import type { Product } from '../types'

export default function AdminProductsPage() {
  const products = useAppSelector((state) => state.products.items)
  const dispatch = useAppDispatch()

  function handleDelete(id: string) {
    if (window.confirm('Delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">Products</h1>
        <Link
          to="/admin/products/new"
          className="h-11 px-6 flex items-center bg-brand rounded-input font-sans font-bold text-[16px] text-ink"
        >
          Create Product
        </Link>
      </div>

      <div className="mt-8 bg-white rounded-card overflow-hidden">
        <DataTable<Product>
          rowKey={(p) => p.id}
          rows={products}
          columns={[
            { key: 'id', label: 'Product ID', render: (p) => `#${p.id}` },
            { key: 'name', label: 'Product Name' },
            { key: 'price', label: 'Product Price', render: (p) => `$${p.price.toFixed(2)}` },
            { key: 'category', label: 'Category' },
            {
              key: 'action',
              label: 'Action',
              render: (p) => (
                <div className="flex gap-3">
                  <Link to={`/admin/products/${p.id}/edit`} aria-label="Edit" className="text-ink">
                    ✎
                  </Link>
                  <button onClick={() => handleDelete(p.id)} aria-label="Delete" className="text-danger">
                    🗑
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
