import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Workout } from '@/app/types/types';
import { Id } from '@/convex/_generated/dataModel';
import { GrabIcon, TrashIcon } from '@/app/assets/svgIcons';

interface SortableWorkoutProps {
	_id: Id<'workouts'>;
	workout: Workout; // Make sure this property is included
	// handleWorkoutDelete: (id: Id<'workouts'>) => void;
	handleDelete: () => Promise<void>;
	loading: boolean;
	routineId: string;
	userId: string;
}

export default function SortableWorkout({ _id, workout, loading, handleDelete }: SortableWorkoutProps) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	if (_id === undefined) {
		return null;
	}

	return (
		<div
			key={_id}
			ref={setNodeRef}
			style={style}
			className='flex items-center w-full px-4 py-2 justify-between border border-primary-dark rounded-[5px] bg-primary-dark'>
			<button {...attributes} {...listeners}>
				<GrabIcon className='w-4 h-4 inline-block' />
			</button>
			<p className='w-1/3 text-xs sm:text-base'>{workout.name}</p>
			<h3 className='w-1/6 text-xs sm:text-base'>{workout.muscleGroup}</h3>
			<p className='w-1/7 text-xs sm:text-base'>Sets:&nbsp;{workout.sets}</p>
			<div>
				{workout.repsValue.map((reps, index) => (
					<div className='flex gap-2 w-1/4 text-xs sm:text-base' key={index}>
						<p>Rep&nbsp;{index + 1}:</p>
						<p>{reps}</p>
					</div>
				))}
			</div>
			<button className='z-[99999]' onClick={handleDelete} id={_id} disabled={loading}>
				<TrashIcon className='w-5 h-5 inline-block' />
			</button>
		</div>
	);
}
