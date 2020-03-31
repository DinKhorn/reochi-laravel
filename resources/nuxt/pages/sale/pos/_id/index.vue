<template>
	<v-container class="kiyoiContainer" id="printPOS">
		<div class="kiyoiPOS">
			<span class="kiyoiPOS--title1">Kiyoi POS</span>
			<span class="kiyoiPOS--title2">Sale Reciept</span>
			<span class="kiyoiPOS--title3">INVOICE</span>
		</div>

		<div class="kiyoiInfo">
			<div class="kiyoiInfo--item">
				<span class="kiyoiInfo--title">Invoice ID: {{pos.reference_no}}</span>
				<span class="kiyoiInfo--title" v-if="pos.member">Sold To: {{ pos.member.name }}</span>
				<span class="kiyoiInfo--title" v-if="pos.member">Phone: {{pos.member.phone }}</span>
				<span class="kiyoiInfo--title" v-if="pos.member">Address: {{ pos.member.address }}</span>
			</div>
			<div class="kiyoiInfo--item">
				<span>Date: {{ pos.created_at }}</span>
			</div>
		</div>
		<div>
			<table class="tablePOS">
				<thead>
					<tr class="tablePOS--item">
						<th class="px-3">Items</th>
						<th class="px-3">Quantity</th>
						<th class="px-3">Price</th>
						<th class="px-3">Total</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="pos.products && pos.products.length > 0">
						<tr v-for="(item, index) in pos.products" :key="index">
							<td class="px-3 tablePOS-border">{{ item.name }}</td>
							<td class="px-3 tablePOS-border">{{ item.pivot.quantity }}</td>
							<td class="px-3 tablePOS-border">$ {{ item.price | formatMoney }}</td>
							<td class="px-3 tablePOS-border">$ {{ subTotal(item) | formatMoney }}</td>
						</tr>
						<tr>
							<td colspan="3" class="px-3">Sub Total</td>
							<td class="px-3">$ {{ totalPrice | formatMoney }}</td>
						</tr>
						<tr>
							<td colspan="3" class="px-3 py-1">Discount</td>
							<td class="px-3 py-1">% {{ pos.discount }}</td>
						</tr>
						<tr>
							<td colspan="3" class="px-3 py-1">Total</td>
							<td class="px-3 py-1">$ {{ total | formatMoney }}</td>
						</tr>
					</template>
					<template v-else>
						<tr class="tablePOS--nodata">
							<td colspan="5">No Available in table</td>
						</tr>
					</template>
				</tbody>
			</table>
			<v-btn @click="print">Print</v-btn>
		</div>
	</v-container>
</template>


<script>
	import Vue from "vue";

	let numeral = require("numeral");

	Vue.filter("formatMoney", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "idSale",
		created() {
			this.fetchSale();
		},

		computed: {
			totalPrice() {
				return this.pos.products.reduce((total, item) => {
					let s = item.price * item.pivot.quantity;
					return total + s;
				}, 0);
			},

			total() {
				return this.pos.products.reduce((total, item) => {
					let s =
						(item.pivot.unit_price -
							(item.pivot.unit_price * this.pos.discount) / 100) *
						item.pivot.quantity;
					return total + s;
					console.log(item);
				}, 0);
			}
		},

		updated() {
			import("print-js").then(() => {
				this.printReady = true;
				const style = `
									.kiyoiContainer {
										// text-align: center;
										padding: 20px;
									}

									.kiyoiPOS {
										text-align: center;
										display: flex;
										flex-direction: column;
										padding-top: 20px;
									}
									
									.kiyoiPOS--title1 {
										font-size: 30px;
										font-weight: 370;
										padding-bottom: 15px;
									}

									.kiyoiPOS--title2 {
										padding-bottom: 15px;
									}

									.kiyoiPOS--title3 {
										padding-bottom: 15px;
										font-size: 25px;
										font-weight: 350;
									}
									
									.kiyoiInfo {
										display: flex;
										justify-content: space-between;
									}
									.kiyoiInfo--item {
										display: flex;
										flex-direction: column;
									}
									.kiyoiInfo--title {
										font-weight: 400;
									}


									.tablePOS { 
										width: 100%; text-align: left; border-collapse: collapse; 
										margin-top: 20px;
									} 
									.tablePOS--item { 
										border-top: 1px solid rgba(0, 0, 0, 0.125); border-bottom: 1px solid rgba(0, 0, 0, 0.125);
									}

									.tablePOS-border {
										border-bottom: 1px solid rgba(0, 0, 0, 0.125);
										padding-top: 5px;
										padding-bottom: 5px;
									}
								`;

				printJS({
					printable: "printPOS",
					type: "html",
					scanStyles: false,
					// style: "../../assets/css/print_pos.scss"
					style
					// targetStyles: []
				});
			});
		},

		data() {
			return {
				pos: [],
				printReady: false
			};
		},

		methods: {
			print() {
				// const style =
				// 	"@page { margin-top: 40px } @media print { body { font-size: 10px; } }";
				printJS({
					printable: "printPOS",
					type: "html",
					scanStyle: false,
					// css: "../../assets/css/print-pos.scss"
					// style,
					targetStyles: ["*"]
				});
			},

			fetchSale() {
				this.$axios
					.$get(`api/sale/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "pos", res.sales);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			subTotal(item) {
				return item.price * item.pivot.quantity;
			}
		}
	};
</script>

<style lang="scss">
	.kiyoiContainer {
		// text-align: center;
		padding: 20px;
	}

	.kiyoiPOS {
		text-align: center;
		display: flex;
		flex-direction: column;
		padding-top: 20px;
		&--title1 {
			font-size: 30px;
			font-weight: 370;
			padding-bottom: 15px;
		}

		&--title2 {
			padding-bottom: 15px;
		}

		&--title3 {
			padding-bottom: 15px;
			font-size: 25px;
			font-weight: 350;
		}
	}

	.kiyoiInfo {
		display: flex;
		justify-content: space-between;
		&--item {
			display: flex;
			flex-direction: column;
		}
		&--title {
			font-weight: 400;
		}
	}

	.tablePOS {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
		&--item {
			border-top: 1px solid rgba($color: #000000, $alpha: 1);
			border-bottom: 1px solid rgba($color: #000000, $alpha: 1);
		}

		&--nodata {
			text-align: center;
			border: 2px solid seagreen;
		}

		&-border {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}
	}
	//
</style>