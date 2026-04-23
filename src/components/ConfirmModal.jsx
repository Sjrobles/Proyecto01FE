import { useRef, useEffect } from 'react'


 
export default function ConfirmModal({ open, onConfirm, onCancel, title, message, confirmLabel = 'Confirmar' }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="rounded-xl p-0 shadow-xl border border-[#dcd9d5] dark:border-[#393836] bg-[#f9f8f5] dark:bg-[#1c1b19] text-[#28251d] dark:text-[#cdccca] max-w-sm w-full backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      onClose={onCancel}
    >
      <div className="p-6">
        <h2 id="modal-title" className="font-display font-bold text-lg mb-2">{title}</h2>
        <p id="modal-desc" className="text-sm text-[#7a7974] dark:text-[#797876] mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-[#01696f] dark:bg-[#4f98a3] text-white text-sm font-medium hover:bg-[#0c4e54] transition-colors"
            aria-label="Cancelar — no hacer cambios"
          >
            Cancelar
          </button>
          
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#f3f0ec] dark:bg-[#1d1c1a] text-[#7a7974] dark:text-[#797876] text-sm font-medium hover:bg-[#e6e4df] dark:hover:bg-[#22211f] transition-colors"
            aria-label={`${confirmLabel} — acción irreversible`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
