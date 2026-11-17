import { useState } from "react";
import { ui } from "../content/ui";
import { t, useLang } from "../locale";

export function VideoGate({ id, title }: { id: string; title: string }) {
  const lang = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="video-gate">
      {open ? (
        <>
          <div className="video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
              title={title}
              allow="accelerometer; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <button type="button" className="text-link" onClick={() => setOpen(false)}>
            {t(ui.closeVideo, lang)}
          </button>
        </>
      ) : (
        <button type="button" className="btn" onClick={() => setOpen(true)}>
          {t(ui.watch, lang)}
        </button>
      )}
      <p className="fine">{t(ui.captions, lang)}</p>
    </div>
  );
}
