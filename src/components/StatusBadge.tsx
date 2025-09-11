import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export function StatusBadge({ status }: { status: string }) {
  return status === 'Active' ? (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
      <CheckCircleIcon className="w-4 h-4 text-green-500" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded">
      <XCircleIcon className="w-4 h-4 text-red-500" /> Inactive
    </span>
  );
}
