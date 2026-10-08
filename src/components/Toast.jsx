import { CheckIcon } from './Icons';

/** Floating notification rendered when `toast` is not null. */
export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
      <CheckIcon className="icon icon--sm" />
      {toast.message}
    </div>
  );
}
