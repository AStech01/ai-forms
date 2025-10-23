


// 'use client';

// import { useParams } from 'next/navigation';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { getSubmissions, deleteSubmission } from '@/lib/api';
// import { Button } from '@/components/ui/Button';
// import { Trash2 } from 'lucide-react';

// export default function SubmissionPage() {
//   const params = useParams();
//   const formId = params?.formId as string;

//   // Safety check for missing formId in URL
//   if (!formId) {
//     return <p className="text-red-500">❌ Form ID is missing in the URL.</p>;
//   }

//   // Fetch all submissions for the given form
//   const {
//     data: submissions = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ['submissions', formId],
//     queryFn: () => getSubmissions(formId),
//     enabled: !!formId,
//   });

//   // Delete a submission by ID
//   const deleteMutation = useMutation({
//     mutationFn: deleteSubmission,
//     onSuccess: () => {
//       refetch();
//     },
//   });

//   return (
//     <div className="mt-10 max-w-3xl mx-auto px-4">
//       <h1 className="text-2xl font-bold mb-6">
//         Submissions for Form ID: <span className="text-blue-600">{formId}</span>
//       </h1>

//       {isLoading && <p>Loading submissions...</p>}
//       {isError && (
//         <p className="text-red-500">❌ Failed to load submissions.</p>
//       )}

//       {!isLoading && submissions.length === 0 && (
//         <p>No submissions found.</p>
//       )}

//       <div className="grid gap-4">
//         {submissions.map((submission) => (
//           <div
//             key={submission.id}
//             className="border p-4 rounded-md flex justify-between items-start gap-4"
//           >
//             <div className="flex-1">
//               <pre className="text-sm text-gray-700 max-h-40 overflow-auto">
//                 {JSON.stringify(submission.data, null, 2)}
//               </pre>
//               <p className="text-xs text-gray-500 mt-2">
//                 Submitted at:{' '}
//                 {new Date(submission.submittedAt).toLocaleString()}
//               </p>
//             </div>

//             <Button
//               variant="danger"
//               onClick={() => deleteMutation.mutate(submission.id)}
//               disabled={deleteMutation.isLoading}
//               aria-label={`Delete submission ${submission.id}`}
//             >
//               <Trash2 size={16} />
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useParams } from 'next/navigation';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { getSubmissions, deleteSubmission } from '@/lib/api';
// import { Button } from '@/components/ui/Button';
// import { Trash2 } from 'lucide-react';

// interface Submission {
//   id: string;
//   formId: string;
//   data: Record<string, any>;
//   submittedAt: string;
// }

// export default function SubmissionPage() {
//   const params = useParams();
//   const formId = params?.formId as string;

//   if (!formId) {
//     return <p className="text-red-500">❌ Form ID is missing in the URL.</p>;
//   }

//   const {
//     data: submissions = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery<Submission[]>({
//     queryKey: ['submissions', formId],
//     queryFn: async () => {
//       const rawSubmissions = await getSubmissions(formId);
//       return rawSubmissions.map((s: any) => ({
//         id: s._id,
//         formId: s.formId,
//         data: s.data,
//         submittedAt: s.submittedAt,
//       }));
//     },
//     enabled: !!formId,
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteSubmission,
//     onSuccess: () => refetch(),
//   });

//   return (
//     <div className="mt-10 max-w-3xl mx-auto px-4">
//       <h1 className="text-2xl font-bold mb-6">
//         Submissions for Form ID:{' '}
//         <span className="text-blue-600">{formId}</span>
//       </h1>

//       {isLoading && <p>Loading submissions...</p>}
//       {isError && <p className="text-red-500">❌ Failed to load submissions.</p>}
//       {!isLoading && submissions.length === 0 && <p>No submissions found.</p>}

//       <div className="grid gap-4">
//         {submissions.map((submission) => (
//           <div
//             key={submission.id}
//             className="border p-4 rounded-md flex justify-between items-start gap-4"
//           >
//             <div className="flex-1">
//               <pre className="text-sm text-gray-700 max-h-40 overflow-auto bg-gray-50 p-2 rounded">
//                 {JSON.stringify(submission.data || {}, null, 2)}
//               </pre>
//               <p className="text-xs text-gray-500 mt-2">
//                 Submitted at: {new Date(submission.submittedAt).toLocaleString()}
//               </p>
//             </div>

//             <Button
//               variant="danger"
//               onClick={() => deleteMutation.mutate(submission.id)}
//               disabled={deleteMutation.isLoading}
//               aria-label={`Delete submission ${submission.id}`}
//             >
//               <Trash2 size={16} />
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useParams } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getSubmissions, deleteSubmission } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import type { Submission } from '@/types/api';

export default function SubmissionPage() {
  const params = useParams();
  const formId = (params?.formId as string) || '';

  const {
    data: submissions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Submission[]>({
    queryKey: ['submissions', formId],
    queryFn: () => getSubmissions(formId),
    enabled: !!formId,
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteSubmission,
    onSuccess: () => refetch(),
  });

  return (
    <div className="mt-10 max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">
        Submissions for Form ID: <span className="text-blue-600">{formId || '—'}</span>
      </h1>

      {!formId && (
        <p className="text-red-500">❌ Form ID is missing in the URL.</p>
      )}

      {isLoading && <p>Loading submissions…</p>}
      {isError && <p className="text-red-500">❌ Failed to load submissions.</p>}
      {!isLoading && submissions.length === 0 && <p>No submissions found.</p>}

      <div className="grid gap-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="border p-4 rounded-md flex justify-between items-start gap-4">
            <div className="flex-1">
              <pre className="text-sm text-gray-700 max-h-40 overflow-auto bg-gray-50 p-2 rounded">
                {JSON.stringify(submission.data || {}, null, 2)}
              </pre>
              <p className="text-xs text-gray-500 mt-2">
                Submitted at: {new Date(submission.submittedAt).toLocaleString()}
              </p>
            </div>
            <Button
              variant="danger"
              onClick={() => deleteMutation.mutate(submission.id)}
              disabled={deleteMutation.status === 'pending'}
              aria-label={`Delete submission ${submission.id}`}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
