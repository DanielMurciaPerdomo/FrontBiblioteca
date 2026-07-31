interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border rounded-3 shadow-sm">
            <div className="modal-header">
              <h5 className="modal-title fw-semibold text-dark">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
                aria-label="Cerrar"
              />
            </div>
            <div className="modal-body text-secondary">{message}</div>
            <div className="modal-footer border-top-0 pt-0">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-3 px-4"
                onClick={onCancel}
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-3 px-4"
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  )
}

export default ConfirmDialog
