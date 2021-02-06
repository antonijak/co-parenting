<template>
	<div class="popup">
		<form class="popup__form" @submit.prevent="save">
			<!-- -------------------------------------------------- -->
			<!--                       title                        -->
			<!-- -------------------------------------------------- -->
			<div class="popup__form__part">
				<label for="title" class="popup__form__label">Title</label>

				<input
					type="text"
					id="title"
					class="popup__form__input"
					v-model="title"
				/>
			</div>

			<!-- -------------------------------------------------- -->
			<!--                     description                    -->
			<!-- -------------------------------------------------- -->

			<div class="popup__form__part">
				<label for="description" class="popup__form__label">Description</label>

				<input
					type="text"
					id="description"
					class="popup__form__input"
					v-model="description"
				/>
			</div>

			<!-- -------------------------------------------------- -->
			<!--                        start                       -->
			<!-- -------------------------------------------------- -->

			<div class="popup__form__part">
				<label class="popup__form__label">Start date</label>

				<span class="popup__form__text">{{
					$moment(start).format('DD.MM.YYYY')
				}}</span>
			</div>

			<!-- -------------------------------------------------- -->
			<!--                       ending                       -->
			<!-- -------------------------------------------------- -->

			<div class="popup__form__part">
				<label for="ends" class="popup__form__label">Ends</label>

				<input
					type="date"
					id="ends"
					class="popup__form__input"
					v-model="ending"
				/>
			</div>

			<!-- -------------------------------------------------- -->
			<!--                     buttons                        -->
			<!-- -------------------------------------------------- -->
			<div class="popup__form__buttons">
				<button @click="$emit('close')" class="popup__form__buttons__button">
					Cancel
				</button>

				<button
					class="popup__form__buttons__button save"
					type="submit"
					:disabled="title === ''"
				>
					Save
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Popup',
	props: {
		beginning: Object,
		today: Object,
		event: Object
	},
	mounted() {
		this.start = this.beginning;
		console.log(this.event);
		if (this.event !== null) {
			this.start = this.event.start;
			this.ending = this.event.ending.format('YYYY-MM-DD');
			this.title = this.event.title;
			this.description = this.event.description;
		}
	},
	data() {
		return {
			ending: this.$moment(this.beginning).format('YYYY-MM-DD'),
			start: null,
			title: '',
			description: ''
		};
	},
	watch: {
		ending() {
			if (this.$moment(this.ending).isBefore(this.$moment(this.start))) {
				alert('Date has passed');
				this.ending = this.$moment(this.start).format('YYYY-MM-DD');
			}
		}
	},
	methods: {
		save() {
			if (this.event !== null) {
				let event = {
					id: this.event.id,
					moment: this.beginning,
					start: this.start,
					ending: this.ending,
					title: this.title,
					description: this.description
				};

				this.$emit('save', {
					event,
					edit: true
				});
			} else {
				let event = {
					moment: this.beginning,
					start: this.start,
					ending: this.ending,
					title: this.title,
					description: this.description
				};

				this.$emit('save', {
					event,
					edit: false
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.popup {
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.13);
	display: flex;
	justify-content: center;
	align-items: center;

	&__form {
		background-color: white;
		width: 50%;
		padding: 2rem;
		border-radius: 5px;
		display: flex;
		flex-direction: column;

		&__label {
			text-transform: uppercase;
			font-size: 0.8rem;
			letter-spacing: 1px;
			color: gray;
		}

		&__text {
			margin: 0.5rem 0;
		}

		&__input {
			padding: 1rem;
			border-radius: 5px;
			border: 1px solid rgb(185, 184, 184);
			margin: 0.5rem 0;
			font-size: 1rem;
			outline: none;
			font-family: 'Lato', sans-serif;

			&:focus {
				border-color: $primary;
			}
		}

		&__part {
			display: flex;
			flex-direction: column;
			margin-bottom: 1rem;
		}

		&__buttons {
			width: 100%;
			display: flex;
			justify-content: flex-end;

			&__button {
				padding: 1rem;
				background-color: transparent;
				border-radius: 5px;
				margin: 0.5rem 0;
				font-size: 1rem;
				letter-spacing: 1px;
				text-transform: uppercase;
				transition: transform 0.2s linear;
				outline: none;
				font-weight: 600;
				min-width: 10rem;

				&:hover {
					transform: scale(1.02);
					opacity: 0.8;
				}
			}

			.save {
				background-color: $primary;
				color: white;
				border-color: $primary;
				margin-left: 2rem;

				&:disabled {
					background-color: rgb(218, 218, 218);
					border-color: rgb(218, 218, 218);
					&:hover {
						transform: scale(1);
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>
