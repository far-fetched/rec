import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const LessonForm = ({lesson, allAuthors, onSave, onChange, saving, errors}) => {
	return (
		<form>
			<h1>Manage Lesson</h1>
			<TextInput
				name="title"
				label="Title"
				value={lesson.title}
				onChange={onChange}
				error={errors.title} />

			<SelectInput
				name="authorId"
				label="Author"
				value={lesson.authorId}
				defaultOption="Select Author"
				options={allAuthors}
				onChange={onChange}
				error={errors.authorId} />

			<TextInput
				name="category"
				label="Category"
				value={lesson.category}
				onChange={onChange}
				error={errors.category} />

			<TextInput
				name="length"
				label="Length"
				value={lesson.length}
				onChange={onChange}
				error={errors.length} />

			<input
				type="submit"
				disabled={saving}
				value={saving ? 'Saving...' : 'Save'}
				className="btn btn-primary"
				onClick={onSave} />

		</form>
	);
};

LessonForm.propTypes = {
	lesson: React.PropTypes.object.isRequired,
	allAuthors: React.PropTypes.array,
	onSave: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	saving: React.PropTypes.bool,
	errors: React.PropTypes.object
};

export default LessonForm;