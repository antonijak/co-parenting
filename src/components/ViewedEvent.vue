<template>
	<div @click="$emit('close')" class="event">
		<div class="event__container">
			<div class="event__container__header">
				<h2>{{ event.title }}</h2>

				<div class="event__container__header__buttons">
					<span class="edit" @click=editEvent>
 						<v-icon name="pen" />
					</span>

					<span class="delete" @click="deleteEvent">
			 			<v-icon name="trash" class="delete" />
					</span>
				</div>
			 </div>
			 
			<p>{{ event.description }}</p>
			<span>Start: {{ event.start.format('DD-MM-YYYY') }}</span>
			
			<span>End: {{ event.ending.format('DD-MM-YYYY') }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ViewedEvent',
	props: {
		event: Object
	},
	methods: {
		editEvent(){
			this.$emit('edit', {event: this.event})
		},
		deleteEvent(){
			if(confirm('Are you sure you want to delete ' + this.event.title )){
				this.$emit('delete', {eventId: this.event.id})
			}
			
		}
	}
};
</script>

<style lang="scss" scoped>
.event {
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.13);
	display: flex;
	justify-content: center;
	align-items: center;

	&__container {
		background-color: white;
		width: 50%;
		padding: 2rem;
		border-radius: 15px;

		&__header {
			width: 100%;
			display: flex;
			justify-content: space-between;

			&__buttons {
				width: 3rem;
				display: flex;
				justify-content: space-between;

				.edit {
				position: relative;
					&:hover {
						color: gray;
						&:after {
							content: 'Edit';
							background-color: rgb(247, 247, 247);
							text-align: center;
							font-size: .9rem;
							width: 3rem;
							height: 1rem;
							position: absolute;
							left: -50%;
							top: -2rem;
							color: black;
							padding: 5px;
						}
					}
				}

				.delete {
				position: relative;
					&:hover {
						color: gray;
						&:after {
							content: 'Delete';
							background-color: rgb(247, 247, 247);
							text-align: center;
							font-size: .9rem;
							width: 3rem;
							height: 1rem;
							position: absolute;
							left: -50%;
							top: -2rem;
							color: black;
							padding: 5px;
						}
					}
				}
			}

			
		}
	}
}
</style>
