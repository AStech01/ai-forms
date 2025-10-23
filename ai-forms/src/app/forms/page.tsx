// // src/app/forms/page.tsx
// 'use client';
// import { useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { generateForm, getMyForms, searchMyForms, deleteForm } from '@/lib/api';
// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { Form } from '@/types/api';
// import Link from 'next/link';
// import { Trash2 } from 'lucide-react';

// export default function FormsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [prompt, setPrompt] = useState('');

//   const { data: forms, refetch } = useQuery({
//     queryKey: ['forms', searchQuery],
//     queryFn: () => (searchQuery ? searchMyForms(searchQuery) : getMyForms()),
//   });

//   const generateMutation = useMutation({
//     mutationFn: generateForm,
//     onSuccess: () => refetch(),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteForm,
//     onSuccess: () => refetch(),
//   });

//   const handleGenerate = () => {
//     generateMutation.mutate({ prompt });
//     setPrompt('');
//   };

//   return (
//     <div className="mt-10">
//       <h1 className="text-2xl font-bold mb-6">My Forms</h1>
//       <div className="flex gap-4 mb-6">
//         <Input
//           placeholder="Generate form with prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//         <Button onClick={handleGenerate} disabled={generateMutation.isPending}>
//           Generate
//         </Button>
//       </div>
//       <Input
//         placeholder="Search forms"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="mb-6"
//       />
//       <div className="grid gap-4">
//         {forms?.map((form: Form) => (
//           <div key={form.id} className="border p-4 rounded-md flex justify-between items-center">
//             <div>
//               <Link href={`/forms/${form.id}`} className="text-blue-600 hover:underline">
//                 {form.title}
//               </Link>
//               <p className="text-sm text-gray-600">{form.description}</p>
//             </div>
//             <Button
//               variant="danger"
//               onClick={() => deleteMutation.mutate(form.id)}
//               disabled={deleteMutation.isPending}
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

// import { useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { generateForm, getMyForms, searchMyForms, deleteForm } from '@/lib/api';
// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { Form } from '@/types/api';
// import Link from 'next/link';
// import { Trash2 } from 'lucide-react';

// export default function FormsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [prompt, setPrompt] = useState('');

//   // ✅ Ensure forms defaults to an empty array
//   const { data: forms = [], isLoading, isError, refetch } = useQuery({
//     queryKey: ['forms', searchQuery],
//     queryFn: () => (searchQuery ? searchMyForms(searchQuery) : getMyForms()),
//   });

//   const generateMutation = useMutation({
//     mutationFn: generateForm,
//     onSuccess: () => refetch(),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteForm,
//     onSuccess: () => refetch(),
//   });

//   const handleGenerate = () => {
//     if (!prompt.trim()) return;
//     generateMutation.mutate({ prompt });
//     setPrompt('');
//   };

//   return (
//     <div className="mt-10">
//       <h1 className="text-2xl font-bold mb-6">My Forms</h1>

//       {/* Generate Form */}
//       <div className="flex gap-4 mb-6">
//         <Input
//           placeholder="Generate form with prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//         <Button onClick={handleGenerate} disabled={generateMutation.isPending}>
//           {generateMutation.isPending ? 'Generating...' : 'Generate'}
//         </Button>
//       </div>

//       {/* Search */}
//       <Input
//         placeholder="Search forms"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="mb-6"
//       />

//       {/* Loading & Error States */}
//       {isLoading && <p>Loading forms...</p>}
//       {isError && <p className="text-red-500">Failed to load forms.</p>}

//       {/* Forms List */}
//       {!isLoading && Array.isArray(forms) && forms.length > 0 ? (
//         <div className="grid gap-4">
//           {forms.map((form: Form) => (
//             <div
//               key={form.id}
//               className="border p-4 rounded-md flex justify-between items-center"
//             >
//               <div>
//                 <Link
//                   href={`/forms/${form.id}`}
//                   className="text-blue-600 hover:underline font-semibold"
//                 >
//                   {form.title}
//                 </Link>
//                 <p className="text-sm text-gray-600">{form.description}</p>
//               </div>
//               <Button
//                 variant="danger"
//                 onClick={() => deleteMutation.mutate(form.id)}
//                 disabled={deleteMutation.isPending}
//               >
//                 <Trash2 size={16} />
//               </Button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !isLoading && <p>No forms found.</p>
//       )}
//     </div>
//   );
// }

'use client';

// import { useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { generateForm, getMyForms, searchMyForms, deleteForm } from '@/lib/api';
// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { Form } from '@/types/api';
// import Link from 'next/link';
// import { Trash2 } from 'lucide-react';

// export default function FormsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [prompt, setPrompt] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fetch forms list, depending on search query
//   const { data: forms = [], isLoading, isError, refetch } = useQuery({
//     queryKey: ['forms', searchQuery],
//     queryFn: () => (searchQuery ? searchMyForms(searchQuery) : getMyForms()),
//   });

//   // Mutation to generate form
//   const generateMutation = useMutation({
//     mutationFn: generateForm,
//     onSuccess: (data) => {
//       // data is the API response, expected like: { success: true, message: "Form generated successfully", form: {...} }
//       refetch();
//       if (data?.message) {
//         setSuccessMessage(data.message);
//         // Clear the message after 3 seconds
//         setTimeout(() => setSuccessMessage(''), 3000);
//       }
//     },
//     onError: () => {
//       setSuccessMessage('Failed to generate form.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     },
//   });

//   // Mutation to delete form
//   const deleteMutation = useMutation({
//     mutationFn: deleteForm,
//     onSuccess: () => refetch(),
//   });

//   // Handle form generation button click
//   const handleGenerate = () => {
//     if (!prompt.trim()) return;
//     generateMutation.mutate({ prompt });
//     setPrompt('');
//   };

//   return (
//     <div className="mt-10 max-w-3xl mx-auto px-4">
//       <h1 className="text-2xl font-bold mb-6">My Forms</h1>

//       {/* Show success or error message */}
//       {successMessage && (
//         <p className="mb-4 p-3 rounded bg-green-100 text-green-800 font-medium">
//           {successMessage}
//         </p>
//       )}

//       {/* Generate Form input + button */}
//       <div className="flex gap-4 mb-6">
//         <Input
//           placeholder="Generate form with prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//         <Button onClick={handleGenerate} disabled={generateMutation.isPending}>
//           {generateMutation.isPending ? 'Generating...' : 'Generate'}
//         </Button>
//       </div>

//       {/* Search forms */}
//       <Input
//         placeholder="Search forms"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="mb-6"
//       />

//       {/* Loading and error states */}
//       {isLoading && <p>Loading forms...</p>}
//       {isError && <p className="text-red-500">Failed to load forms.</p>}

//       {/* Forms List */}
//       {!isLoading && Array.isArray(forms) && forms.length > 0 ? (
//         <div className="grid gap-4">
//           {forms.map((form: Form) => (
//             <div
//               key={form.id}
//               className="border p-4 rounded-md flex justify-between items-center"
//             >
//               <div>
//                 <Link
//                   href={`/forms/${form.id}`}
//                   className="text-blue-600 hover:underline font-semibold"
//                 >
//                   {form.title}
//                 </Link>
//                 <p className="text-sm text-gray-600">{form.description}</p>
//               </div>
//               <Button
//                 variant="danger"
//                 onClick={() => deleteMutation.mutate(form.id)}
//                 disabled={deleteMutation.isPending}
//               >
//                 <Trash2 size={16} />
//               </Button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !isLoading && <p>No forms found.</p>
//       )}
//     </div>
//   );
// }


// import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { generateForm, getMyForms, searchMyForms, deleteForm } from '@/lib/api';
// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { Form } from '@/types/api';
// import Link from 'next/link';
// import { Trash2 } from 'lucide-react';

// export default function FormsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [prompt, setPrompt] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const queryClient = useQueryClient();

//   // Fetch forms list, depending on search query
//   const {
//     data: forms = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ['forms', searchQuery],
//     queryFn: () => (searchQuery ? searchMyForms(searchQuery) : getMyForms()),
//     keepPreviousData: true,
//   });

//   // Mutation to generate form
//   const generateMutation = useMutation({
//     mutationFn: generateForm,
//     onSuccess: (data) => {
//       // Invalidate the query to refetch updated forms
//       queryClient.invalidateQueries(['forms']);
//       if (data?.message) {
//         setSuccessMessage(data.message);
//         setTimeout(() => setSuccessMessage(''), 3000);
//       }
//     },
//     onError: () => {
//       setSuccessMessage('Failed to generate form.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     },
//   });

//   // Mutation to delete form
//   const deleteMutation = useMutation({
//     mutationFn: deleteForm,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['forms']);
//     },
//     onError: () => {
//       setSuccessMessage('Failed to delete form.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     },
//   });

//   // Handle form generation button click
//   const handleGenerate = () => {
//     if (!prompt.trim()) return;
//     generateMutation.mutate({ prompt });
//     setPrompt('');
//     setSearchQuery(''); // Clear search to ensure new form shows
//   };

//   return (
//     <div className="mt-10 max-w-3xl mx-auto px-4">
//       <h1 className="text-2xl font-bold mb-6">My Forms</h1>

//       {/* Show success or error message */}
//       {successMessage && (
//         <p className="mb-4 p-3 rounded bg-green-100 text-green-800 font-medium">
//           {successMessage}
//         </p>
//       )}

//       {/* Generate Form input + button */}
//       <div className="flex gap-4 mb-6">
//         <Input
//           placeholder="Generate form with prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           disabled={generateMutation.isLoading}
//         />
//         <Button onClick={handleGenerate} disabled={generateMutation.isLoading}>
//           {generateMutation.isLoading ? 'Generating...' : 'Generate'}
//         </Button>
//       </div>

//       {/* Search forms */}
//       <Input
//         placeholder="Search forms"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="mb-6"
//       />

//       {/* Loading and error states */}
//       {isLoading && <p>Loading forms...</p>}
//       {isError && <p className="text-red-500">Failed to load forms.</p>}

//       {/* Forms List */}
//       {!isLoading && Array.isArray(forms) && forms.length > 0 ? (
//         <div className="grid gap-4">
//           {forms.map((form: Form) => (
//             <div
//               key={form.id}
//               className="border p-4 rounded-md flex justify-between items-center"
//             >
//               <div>
//                 <Link
//                   href={`/forms/${form.id}`}
//                   className="text-blue-600 hover:underline font-semibold"
//                 >
//                   {form.title}
//                 </Link>
//                 <p className="text-sm text-gray-600">{form.description}</p>
//               </div>
//               <Button
//                 variant="danger"
//                 onClick={() => deleteMutation.mutate(form.id)}
//                 disabled={deleteMutation.isLoading}
//                 aria-label={`Delete form ${form.title}`}
//               >
//                 <Trash2 size={16} />
//               </Button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !isLoading && <p>No forms found.</p>
//       )}
//     </div>
//   );
// }


// import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { generateForm, getMyForms, searchMyForms, deleteForm } from '@/lib/api';
// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { Form } from '@/types/api';
// import Link from 'next/link';
// import { Trash2 } from 'lucide-react';

// export default function FormsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [prompt, setPrompt] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const queryClient = useQueryClient();

//   // Fetch forms list, depending on search query
//   const {
//     data: forms = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ['forms', searchQuery],
//     queryFn: () => (searchQuery ? searchMyForms(searchQuery) : getMyForms()),
//     select: (data) => {
//       // Adjust according to your API response structure!
//       if (Array.isArray(data)) return data;
//       if (data?.forms) return data.forms;
//       return [];
//     },
//     keepPreviousData: true,
//   });

//   console.log('Forms data:', forms);

//   // Mutation to generate form
//   const generateMutation = useMutation({
//     mutationFn: generateForm,
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(['forms']);
//       if (data?.message) {
//         setSuccessMessage(data.message);
//         setTimeout(() => setSuccessMessage(''), 3000);
//       }
//     },
//     onError: () => {
//       setSuccessMessage('Failed to generate form.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     },
//   });

//   // Mutation to delete form
//   const deleteMutation = useMutation({
//     mutationFn: deleteForm,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['forms']);
//     },
//     onError: () => {
//       setSuccessMessage('Failed to delete form.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     },
//   });

//   const handleGenerate = () => {
//     if (!prompt.trim()) return;
//     generateMutation.mutate({ prompt });
//     setPrompt('');
//     setSearchQuery(''); // Clear search to ensure new form shows
//   };

//   return (
//     <div className="mt-10 max-w-3xl mx-auto px-4">
//       <h1 className="text-2xl font-bold mb-6">My Forms</h1>

//       {successMessage && (
//         <p className="mb-4 p-3 rounded bg-green-100 text-green-800 font-medium">
//           {successMessage}
//         </p>
//       )}

//       <div className="flex gap-4 mb-6">
//         <Input
//           placeholder="Generate form with prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           disabled={generateMutation.isLoading}
//         />
//         <Button onClick={handleGenerate} disabled={generateMutation.isLoading}>
//           {generateMutation.isLoading ? 'Generating...' : 'Generate'}
//         </Button>
//       </div>

//       <Input
//         placeholder="Search forms"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="mb-6"
//       />

//       {isLoading && <p>Loading forms...</p>}
//       {isError && <p className="text-red-500">Failed to load forms.</p>}

//       {!isLoading && forms.length > 0 ? (
//         <div className="grid gap-4">
//           {forms.map((form: Form) => (
//             <div
//               key={form.id}
//               className="border p-4 rounded-md flex justify-between items-center"
//             >
//               <div>
//                 <Link
//                   href={`/forms/${form.id}`}
//                   className="text-blue-600 hover:underline font-semibold"
//                 >
//                   {form.title}
//                 </Link>
//                 <p className="text-sm text-gray-600">{form.description}</p>
//               </div>
//               <Button
//                 variant="danger"
//                 onClick={() => deleteMutation.mutate(form.id)}
//                 disabled={deleteMutation.isLoading}
//                 aria-label={`Delete form ${form.title}`}
//               >
//                 <Trash2 size={16} />
//               </Button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !isLoading && <p>No forms found.</p>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { generateForm, getMyForms, searchMyForms, deleteForm } from '@/lib/api';
// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { Form } from '@/types/api';
// import Link from 'next/link';
// import { Trash2 } from 'lucide-react';

// export default function FormsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [prompt, setPrompt] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const queryClient = useQueryClient();

//   const {
//     data: forms = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ['forms', searchQuery],
//     queryFn: () => (searchQuery ? searchMyForms(searchQuery) : getMyForms()),
//     select: (data) => {
//       if (Array.isArray(data)) return data;
//       if (data?.forms) return data.forms;
//       return [];
//     },
//     keepPreviousData: true,
//   });

//   const generateMutation = useMutation({
//     mutationFn: generateForm,
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(['forms']);
//       if (data?.message) {
//         setSuccessMessage(data.message);
//         setTimeout(() => setSuccessMessage(''), 3000);
//       }
//     },
//     onError: () => {
//       setSuccessMessage('Failed to generate form.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteForm,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['forms']);
//     },
//     onError: () => {
//       setSuccessMessage('Failed to delete form.');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     },
//   });

//   const handleGenerate = () => {
//     if (!prompt.trim()) return;
//     generateMutation.mutate({ prompt });
//     setPrompt('');
//     setSearchQuery('');
//   };

//   return (
//     <div className="mt-10 max-w-3xl mx-auto px-4">
//       <h1 className="text-2xl font-bold mb-6">My Forms</h1>

//       {successMessage && (
//         <p className="mb-4 p-3 rounded bg-green-100 text-green-800 font-medium">
//           {successMessage}
//         </p>
//       )}

//       <div className="flex gap-4 mb-6">
//         <Input
//           placeholder="Generate form with prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           disabled={generateMutation.isLoading}
//         />
//         <Button onClick={handleGenerate} disabled={generateMutation.isLoading}>
//           {generateMutation.isLoading ? 'Generating...' : 'Generate'}
//         </Button>
//       </div>

//       <Input
//         placeholder="Search forms"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="mb-6"
//       />

//       {isLoading && <p>Loading forms...</p>}
//       {isError && <p className="text-red-500">Failed to load forms.</p>}

//       {!isLoading && forms.length > 0 ? (
//         <div className="grid gap-4">
//           {forms.map((form: Form) => (
//             <div
//               key={form.id}
//               className="border p-4 rounded-md flex justify-between items-center"
//             >
//               <div>
//                 <Link
//                   href={`/forms/${form.id}/submission`}
//                   className="text-blue-600 hover:underline font-semibold"
//                 >
//                   {form.title}
//                 </Link>
//                 <p className="text-sm text-gray-600">{form.description}</p>
//               </div>
//               <Button
//                 variant="danger"
//                 onClick={() => deleteMutation.mutate(form.id)}
//                 disabled={deleteMutation.isLoading}
//                 aria-label={`Delete form ${form.title}`}
//               >
//                 <Trash2 size={16} />
//               </Button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !isLoading && <p>No forms found.</p>
//       )}
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateForm, getMyForms, searchMyForms, deleteForm } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Form as FormType } from '@/types/api';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function FormsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [prompt, setPrompt] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const queryClient = useQueryClient();

  const {
    data: forms = [],
    isLoading,
    isError,
  } = useQuery<FormType[]>({
    queryKey: ['forms', searchQuery],
    queryFn: () => (searchQuery ? searchMyForms(searchQuery) : getMyForms()),
    placeholderData: (prev) => prev as FormType[] | undefined,
  });

  const generateMutation = useMutation({
    mutationFn: generateForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      setSuccessMessage('Form generated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
    onError: () => {
      setSuccessMessage('Failed to generate form.');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
    onError: () => {
      setSuccessMessage('Failed to delete form.');
      setTimeout(() => setSuccessMessage(''), 3000);
    },
  });

  const handleGenerate = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    generateMutation.mutate({ prompt: trimmed });
    setPrompt('');
    setSearchQuery('');
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Forms</h1>

      {successMessage && (
        <p className="mb-4 p-3 rounded bg-green-100 text-green-800 font-medium">
          {successMessage}
        </p>
      )}

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Generate form with prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={generateMutation.status === 'pending'}
        />
        <Button onClick={handleGenerate} disabled={generateMutation.status === 'pending'}>
          {generateMutation.status === 'pending' ? 'Generating...' : 'Generate'}
        </Button>
      </div>

      <Input
        placeholder="Search forms"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
      />

      {isLoading && <p>Loading forms...</p>}
      {isError && <p className="text-red-500">Failed to load forms.</p>}

      {!isLoading && forms.length > 0 ? (
        <div className="grid gap-4">
          {forms.map((form: FormType) => (
            <div
              key={form.id}
              className="border p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <Link
                  href={`/forms/${form.id}/submissions`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {form.title}
                </Link>
                <p className="text-sm text-gray-600">{form.description}</p>
              </div>
              <Button
                variant="danger"
                onClick={() => deleteMutation.mutate(form.id)}
                disabled={deleteMutation.status === 'pending'}
                aria-label={`Delete form ${form.title}`}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <p>No forms found.</p>
      )}
    </div>
  );
}
