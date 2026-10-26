const SCALE_MIN = 0.1;
const SCALE_MAX = 40;

interface PointerPosition {
    x: number;
    y: number;
}

function naturalSize(svg: SVGSVGElement): { width: number; height: number } {
    const viewBox = svg.viewBox.baseVal;
    if (viewBox && viewBox.width > 0 && viewBox.height > 0) {
        return { width: viewBox.width, height: viewBox.height };
    }
    const rect = svg.getBoundingClientRect();
    return { width: Math.max(rect.width, 1), height: Math.max(rect.height, 1) };
}

function openLightbox(svg: SVGSVGElement, opener: HTMLElement) {
    const { width, height } = naturalSize(svg);

    const overlay = document.createElement('div');
    overlay.className = 'hapi-mermaid-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Diagram viewer');

    const stage = document.createElement('div');
    stage.className = 'hapi-mermaid-lightbox-stage';

    // The diagram's styles and marker refs are scoped by its svg id; a renamed copy keeps them
    // without colliding with the original on the page.
    const markup = svg.id ? svg.outerHTML.split(svg.id).join(`${svg.id}-lightbox`) : svg.outerHTML;
    stage.innerHTML = markup;

    const clone = stage.querySelector('svg');
    if (!clone) {
        return;
    }
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.maxWidth = 'none';

    const close = document.createElement('button');
    close.className = 'hapi-mermaid-lightbox-close';
    close.setAttribute('aria-label', 'Close diagram viewer');
    close.textContent = '×';

    const hint = document.createElement('div');
    hint.className = 'hapi-mermaid-lightbox-hint';
    hint.textContent = 'scroll or pinch to zoom · drag to pan · double-click to reset · esc to close';

    overlay.append(stage, close, hint);

    let scale = 1;
    let tx = 0;
    let ty = 0;

    const apply = () => {
        stage.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    };

    const fit = () => {
        scale = Math.min((window.innerWidth * 0.92) / width, (window.innerHeight * 0.92) / height);
        tx = (window.innerWidth - width * scale) / 2;
        ty = (window.innerHeight - height * scale) / 2;
        apply();
    };

    const zoomAt = (clientX: number, clientY: number, factor: number) => {
        const next = Math.min(SCALE_MAX, Math.max(SCALE_MIN, scale * factor));
        const applied = next / scale;
        tx = clientX - (clientX - tx) * applied;
        ty = clientY - (clientY - ty) * applied;
        scale = next;
        apply();
    };

    const pointers = new Map<number, PointerPosition>();

    const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * 0.002));
    };

    const onPointerDown = (event: PointerEvent) => {
        overlay.setPointerCapture(event.pointerId);
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    };

    const onPointerMove = (event: PointerEvent) => {
        const previous = pointers.get(event.pointerId);
        if (!previous) {
            return;
        }
        const current = { x: event.clientX, y: event.clientY };

        if (pointers.size === 1) {
            tx += current.x - previous.x;
            ty += current.y - previous.y;
            apply();
        } else if (pointers.size === 2) {
            const other = [...pointers.entries()].find(([id]) => id !== event.pointerId);
            if (other) {
                const [, anchor] = other;
                const previousDistance = Math.hypot(previous.x - anchor.x, previous.y - anchor.y);
                const currentDistance = Math.hypot(current.x - anchor.x, current.y - anchor.y);
                if (previousDistance > 0) {
                    const midX = (current.x + anchor.x) / 2;
                    const midY = (current.y + anchor.y) / 2;
                    zoomAt(midX, midY, currentDistance / previousDistance);
                }
            }
        }
        pointers.set(event.pointerId, current);
    };

    const onPointerEnd = (event: PointerEvent) => {
        pointers.delete(event.pointerId);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            teardown();
        }

        // The close button is the only control, so Tab stays on it instead of reaching the page behind.
        if (event.key === 'Tab') {
            event.preventDefault();
            close.focus();
        }
    };

    const teardown = () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('resize', fit);
        overlay.remove();
        document.body.style.removeProperty('overflow');
        opener.focus();
    };

    overlay.addEventListener('wheel', onWheel, { passive: false });
    overlay.addEventListener('pointerdown', onPointerDown);
    overlay.addEventListener('pointermove', onPointerMove);
    overlay.addEventListener('pointerup', onPointerEnd);
    overlay.addEventListener('pointercancel', onPointerEnd);
    overlay.addEventListener('dblclick', fit);
    close.addEventListener('click', teardown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', fit);

    document.body.style.overflow = 'hidden';
    document.body.appendChild(overlay);
    close.focus();
    fit();
}

function openFrom(target: EventTarget | null) {
    if (!(target instanceof Element)) {
        return false;
    }
    const container = target.closest('.mermaid');
    if (!(container instanceof HTMLElement) || container.closest('.hapi-mermaid-lightbox')) {
        return false;
    }
    const svg = container.querySelector('svg');
    if (!svg) {
        return false;
    }
    openLightbox(svg, container);
    return true;
}

/** Opens a rendered Mermaid diagram in a full-screen viewer with zoom and pan, by click, Enter, or Space. */
export function setupMermaidZoom() {
    document.addEventListener('click', (event) => {
        openFrom(event.target);
    });

    document.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && openFrom(event.target)) {
            event.preventDefault();
        }
    });
}
