import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'

export function BagDrawer() {
  const auth = useAuth()
  const cart = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  function handleClose() {
    setShowPlaceholder(false)
    cart.closeDrawer()
  }

  const subtotal = cart.items.reduce(
    (sum, line) => sum + (line.salePrice ?? line.price) * line.quantity,
    0,
  )

  function handleOrder() {
    if (auth.status === 'authenticated') {
      setShowPlaceholder(true)
      return
    }
    navigate('/login', { state: { from: location, cartIntent: true } })
  }

  return (
    <>
      <div
        className={`drawer-backdrop ${cart.isOpen ? 'drawer-backdrop-open' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <aside
        className={`drawer-panel ${cart.isOpen ? 'drawer-panel-open' : ''}`}
        aria-label="Shopping bag"
        aria-hidden={!cart.isOpen}
      >
        <div className="flex h-full flex-col">
          <div className="divider flex items-center justify-between border-b px-6 py-5">
            <h2>Bag</h2>
            <button type="button" className="nav-link" onClick={handleClose}>
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.items.length === 0 ? (
              <p className="text-[var(--color-ink-soft)]">Your bag is empty.</p>
            ) : (
              <ul className="flex flex-col gap-6">
                {cart.items.map((line) => (
                  <li key={`${line.productId}-${line.size}`} className="flex gap-4">
                    <div className="media aspect-[3/4] w-20 shrink-0">
                      <img
                        src={line.imageUrl}
                        alt={line.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <span className="label-muted">{line.name}</span>
                      <span className="text-sm text-[var(--color-ink-soft)]">Size {line.size}</span>
                      {line.salePrice ? (
                        <span className="flex gap-2">
                          <span className="price price-sale">${line.salePrice.toFixed(2)}</span>
                          <span className="price text-[var(--color-muted)] line-through">
                            ${line.price.toFixed(2)}
                          </span>
                        </span>
                      ) : (
                        <span className="price">${line.price.toFixed(2)}</span>
                      )}
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          type="button"
                          className="icon-btn"
                          aria-label="Decrease quantity"
                          disabled={line.quantity <= 1}
                          onClick={() => cart.updateQuantity(line, line.quantity - 1)}
                        >
                          &minus;
                        </button>
                        <span className="text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          className="icon-btn"
                          aria-label="Increase quantity"
                          onClick={() => cart.updateQuantity(line, line.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="nav-link ml-auto"
                          onClick={() => cart.removeItem(line)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart.items.length > 0 && (
            <div className="divider flex flex-col gap-3 border-t px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="label-muted">Subtotal</span>
                <span className="price">${subtotal.toFixed(2)}</span>
              </div>
              {showPlaceholder ? (
                <p className="text-sm text-[var(--color-ink-soft)]">
                  Checkout isn't available yet.
                </p>
              ) : (
                <button type="button" className="btn btn-primary w-full" onClick={handleOrder}>
                  Order
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
