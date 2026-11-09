import ModalProps from "./modal";

export class ModalService {
    private static instance: ModalService;
    private static loadModals(): void {
        // Load modals from the DOM if needed
        const ms = document.querySelectorAll('dialog.modal');
        for (let m of ms) {
            const id = m.id;
            if (id && !ModalService.instance.modals.has(id)) {
                ModalService.instance.registerModal({
                    id: id,
                    isOpen: m.hasAttribute('open'),
                    title: m.querySelector('.modal-header .modal-title')?.innerHTML ?? "Title",
                    content: m.querySelector('.modal-content')?.innerHTML ?? "Content",
                    footer: m.querySelector('.modal-footer')?.innerHTML ?? "",
                    onOpen: (() => { m.setAttribute('open', 'true'); }),
                    onClose: () => { m.removeAttribute('open'); }
                });
            }
        }
    }
    public static getInstance(): ModalService {
        if (!ModalService.instance) {
            ModalService.instance = new ModalService();
            ModalService.loadModals();
        }
        return ModalService.instance;
    }
    private constructor() { this.modals = new Map<string, ModalProps>(); }
    public modals: Map<string, ModalProps>;
    public registerModal(modal: ModalProps): void {
        this.modals.set(modal.id, modal);
    }
    public unregisterModal(modalId: string): void {
        this.modals.delete(modalId);
    }
    public openModal(modalId: string): void {
        ModalService.loadModals();
        const modal = this.modals.get(modalId);
        Array.from(this.modals.values())
            .filter(m => m.id !== modalId && m.isOpen)
            .forEach(m => {
                m.isOpen = false;
                m.onClose?.();
            });
        if (modal && !modal.isOpen) {
            modal.isOpen = true;
            modal.onOpen?.();
        }
    }
    public closeModal(modalId: string): void {
        ModalService.loadModals();
        const modal = this.modals.get(modalId);
        if (modal && modal.isOpen) {
            modal.isOpen = false;
            modal.onClose?.();
        }
    }
}