import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Field from '../components/Field'
import NotFound from '../components/NotFound'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addProduct, updateProduct } from '../store/productsSlice'
import type { Product } from '../types'

const emptyProduct: Product = {
  id: '',
  slug: '',
  name: '',
  brand: '',
  category: '',
  price: 0,
  rating: 0,
  reviewCount: 0,
  countInStock: 0,
  image: '',
  description: '',
}

export default function AdminProductFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const existing = useAppSelector((state) => state.products.items.find((p) => p.id === id))

  const [form, setForm] = useState<Product>(existing ?? emptyProduct)

  if (isEdit && !existing) {
    return <NotFound message="Product not found." backTo="/admin/products" backLabel="Back to Products" />
  }

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) set('image', URL.createObjectURL(file))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const slug = form.slug || form.name.toLowerCase().trim().replace(/\s+/g, '-')
    const id = form.id || slug
    const product: Product = { ...form, id, slug }
    if (isEdit) {
      dispatch(updateProduct(product))
    } else {
      dispatch(addProduct(product))
    }
    navigate('/admin/products')
  }

  return (
    <div className="max-w-[1640px] mx-auto px-6 py-10">
      <h1 className="font-sans font-bold text-[22px] sm:text-[26px] md:text-[32px] text-ink">{isEdit ? 'Edit Product' : 'Create New Product'}</h1>

      <form onSubmit={handleSubmit} className="mt-8 bg-surface rounded-card p-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-10">
          <div>
            <label className="block border-2 border-dashed border-grey-300 rounded-card aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden">
              {form.image ? (
                <img src={form.image} alt="Product" className="w-full h-full object-contain" />
              ) : (
                <span className="font-sans text-[14px] text-muted">Product Image</span>
              )}
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>
          </div>

          <div>
            <p className="font-sans font-bold text-[20px] text-ink mb-4">Product Details</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Product name" value={form.name} onChange={(v) => set('name', v)} />
              <Field label="Product Brand" value={form.brand} onChange={(v) => set('brand', v)} />
              <Field label="Product ID" value={form.id} onChange={(v) => set('id', v)} placeholder="auto from name" />
              <Field label="Product Category" value={form.category} onChange={(v) => set('category', v)} />
            </div>

            <label className="block mt-4">
              <span className="font-sans text-[16px] text-muted">Product Description</span>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={4}
                className="w-full mt-1 rounded-input border border-grey-300 bg-white p-3 font-sans text-[16px] text-ink"
              />
            </label>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Field
                label="Count in Stock"
                type="number"
                value={String(form.countInStock)}
                onChange={(v) => set('countInStock', Number(v) || 0)}
              />
              <Field
                label="Price"
                type="number"
                value={String(form.price)}
                onChange={(v) => set('price', Number(v) || 0)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button type="submit" className="h-11 px-6 bg-brand rounded-input font-sans font-bold text-[16px] text-ink">
            {isEdit ? 'Save Product' : 'Create New Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
