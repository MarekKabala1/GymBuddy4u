import { Id } from '@/convex/_generated/dataModel';

type DeleteConfirmProps = {
	handleDelete: () => Promise<void>;
	setShowModal: (value: boolean) => void;
	id: Id<'workoutsWeekRoutine'> | null;
};

export default function DeleteConfirm({ handleDelete, setShowModal, id }: DeleteConfirmProps) {
	return (
		<div className='fixed z-50 inset-0 overflow-y-auto'>
			<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				<div className='fixed inset-0 transition-opacity' aria-hidden='true'>
					<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
				</div>
				<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
					&#8203;
				</span>
				<div className='inline-block align-bottom bg-primary-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<div className='bg-primary-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						<div className='sm:flex sm:items-start'>
							<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
								<h3 className='text-lg leading-6 font-medium text-primary-danger'>Delete Workout Routine</h3>
								<div className='mt-2'>
									<p className='text-sm text-primary-danger'>Are you sure you want to delete this workout routine, and all associated data?</p>
								</div>
							</div>
						</div>
					</div>
					<div className='bg-primary-dark px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
						<button
							onClick={handleDelete}
							type='button'
							className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-danger text-base font-medium text-primary-light hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue sm:ml-3 sm:w-auto sm:text-sm'>
							Delete
						</button>

						<button
							onClick={() => setShowModal(false)}
							type='button'
							className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-primary-light text-base font-medium text-primary-dark hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
