interface ConfirmationDialogProps {
    isOpen: boolean
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
    loading?: boolean
    tone?: 'danger' | 'default'
}

const ConfirmationDialog = ({
    isOpen,
    title = 'Confirm action',
    description = 'Are you sure you want to continue?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    loading = false,
    tone = 'danger',
}: ConfirmationDialogProps) => {
    if (!isOpen) return null;

    const confirmClasses = tone === 'danger'
        ? 'bg-[#B42318] hover:bg-[#981B13] focus:ring-[#B42318]/20'
        : 'bg-[#14213d] hover:bg-[#0f1a32] focus:ring-[#14213d]/20';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/50 px-4 backdrop-blur-sm">
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirmation-title"
                className="w-full max-w-md rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.18)]"
            >
                <div className="mb-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B42318]">Confirmation</p>
                    <h2 id="confirmation-title" className="mt-3 font-['Epilogue'] text-2xl font-semibold text-dark">
                        {title}
                    </h2>
                    <p className="mt-3 font-['Inter'] text-sm leading-6 text-[#667085]">{description}</p>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-2xl border border-[#D7DEEA] px-4 py-3 font-['Inter'] text-sm font-semibold text-dark transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`rounded-2xl px-4 py-3 font-['Inter'] text-sm font-semibold text-white transition focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${confirmClasses}`}
                    >
                        {loading ? 'Processing...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog
