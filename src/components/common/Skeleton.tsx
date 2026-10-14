import React from 'react';

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs animate-pulse"
        >
          <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />
          <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2.5" />
          <div className="h-3 bg-gray-100 rounded-md w-1/2 mb-4" />
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="h-3 bg-gray-200 rounded-md w-1/4" />
            <div className="h-6 bg-gray-200 rounded-md w-16" />
          </div>
        </div>
      ))}
    </>
  );
};

export const TableRowSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse border-b border-gray-100">
          <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-12" /></td>
          <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-48" /></td>
          <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-24" /></td>
          <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-32" /></td>
          <td className="py-4 px-4"><div className="h-6 bg-gray-200 rounded-md w-20" /></td>
        </tr>
      ))}
    </>
  );
};

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-32 h-32 rounded-2xl bg-gray-200 shrink-0" />
        <div className="flex-1 w-full space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
};
