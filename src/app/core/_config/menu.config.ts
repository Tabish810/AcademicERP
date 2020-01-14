export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				// {
				// 	title: 'Dashboards',
				// 	root: true,
				// 	alignment: 'left',
				// 	page: '/dashboard',
				// 	translate: 'MENU.DASHBOARD',
				// },
				// {
				// 	title: 'Components',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	submenu: [
				// 		{
				// 			title: 'Google Material here',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-interface-7',
				// 			submenu: [
				// 				{
				// 					title: 'Form Controls',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Auto Complete',
				// 							page: '/material/form-controls/autocomplete',
				// 							permission: 'accessToECommerceModule'
				// 						},
				// 						{
				// 							title: 'Checkbox',
				// 							page: '/material/form-controls/checkbox'
				// 						},
				// 						{
				// 							title: 'Radio Button',
				// 							page: '/material/form-controls/radiobutton'
				// 						},
				// 						{
				// 							title: 'Datepicker',
				// 							page: '/material/form-controls/datepicker'
				// 						},
				// 						{
				// 							title: 'Form Field',
				// 							page: '/material/form-controls/formfield'
				// 						},
				// 						{
				// 							title: 'Input',
				// 							page: '/material/form-controls/input'
				// 						},
				// 						{
				// 							title: 'Select',
				// 							page: '/material/form-controls/select'
				// 						},
				// 						{
				// 							title: 'Slider',
				// 							page: '/material/form-controls/slider'
				// 						},
				// 						{
				// 							title: 'Slider Toggle',
				// 							page: '/material/form-controls/slidertoggle'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Navigation',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Menu',
				// 							page: '/material/navigation/menu'
				// 						},
				// 						{
				// 							title: 'Sidenav',
				// 							page: '/material/navigation/sidenav'
				// 						},
				// 						{
				// 							title: 'Toolbar',
				// 							page: '/material/navigation/toolbar'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Layout',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Card',
				// 							page: '/material/layout/card'
				// 						},
				// 						{
				// 							title: 'Divider',
				// 							page: '/material/layout/divider'
				// 						},
				// 						{
				// 							title: 'Expansion panel',
				// 							page: '/material/layout/expansion-panel'
				// 						},
				// 						{
				// 							title: 'Grid list',
				// 							page: '/material/layout/grid-list'
				// 						},
				// 						{
				// 							title: 'List',
				// 							page: '/material/layout/list'
				// 						},
				// 						{
				// 							title: 'Tabs',
				// 							page: '/material/layout/tabs'
				// 						},
				// 						{
				// 							title: 'Stepper',
				// 							page: '/material/layout/stepper'
				// 						},
				// 						{
				// 							title: 'Default Forms',
				// 							page: '/material/layout/default-forms'
				// 						},
				// 						{
				// 							title: 'Tree',
				// 							page: '/material/layout/tree'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Buttons & Indicators',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Button',
				// 							page: '/material/buttons-and-indicators/button'
				// 						},
				// 						{
				// 							title: 'Button toggle',
				// 							page: '/material/buttons-and-indicators/button-toggle'
				// 						},
				// 						{
				// 							title: 'Chips',
				// 							page: '/material/buttons-and-indicators/chips'
				// 						},
				// 						{
				// 							title: 'Icon',
				// 							page: '/material/buttons-and-indicators/icon'
				// 						},
				// 						{
				// 							title: 'Progress bar',
				// 							page: '/material/buttons-and-indicators/progress-bar'
				// 						},
				// 						{
				// 							title: 'Progress spinner',
				// 							page: '/material/buttons-and-indicators/progress-spinner'
				// 						},
				// 						{
				// 							title: 'Ripples',
				// 							page: '/material/buttons-and-indicators/ripples'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Popups & Modals',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Bottom sheet',
				// 							page: '/material/popups-and-modals/bottom-sheet'
				// 						},
				// 						{
				// 							title: 'Dialog',
				// 							page: '/material/popups-and-modals/dialog'
				// 						},
				// 						{
				// 							title: 'Snackbar',
				// 							page: '/material/popups-and-modals/snackbar'
				// 						},
				// 						{
				// 							title: 'Tooltip',
				// 							page: '/material/popups-and-modals/tooltip'
				// 						}
				// 					]
				// 				},
				// 				{
				// 					title: 'Data table',
				// 					bullet: 'dot',
				// 					submenu: [
				// 						{
				// 							title: 'Paginator',
				// 							page: '/material/data-table/paginator'
				// 						},
				// 						{
				// 							title: 'Sort header',
				// 							page: '/material/data-table/sort-header'
				// 						},
				// 						{
				// 							title: 'Table',
				// 							page: '/material/data-table/table'
				// 						}
				// 					]
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Ng-Bootstrap',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-web',
				// 			submenu: [
				// 				{
				// 					title: 'Accordion',
				// 					page: '/ngbootstrap/accordion'
				// 				},
				// 				{
				// 					title: 'Alert',
				// 					page: '/ngbootstrap/alert'
				// 				},
				// 				{
				// 					title: 'Buttons',
				// 					page: '/ngbootstrap/buttons'
				// 				},
				// 				{
				// 					title: 'Carousel',
				// 					page: '/ngbootstrap/carousel'
				// 				},
				// 				{
				// 					title: 'Collapse',
				// 					page: '/ngbootstrap/collapse'
				// 				},
				// 				{
				// 					title: 'Datepicker',
				// 					page: '/ngbootstrap/datepicker'
				// 				},
				// 				{
				// 					title: 'Dropdown',
				// 					page: '/ngbootstrap/dropdown'
				// 				},
				// 				{
				// 					title: 'Modal',
				// 					page: '/ngbootstrap/modal'
				// 				},
				// 				{
				// 					title: 'Pagination',
				// 					page: '/ngbootstrap/pagination'
				// 				},
				// 				{
				// 					title: 'Popover',
				// 					page: '/ngbootstrap/popover'
				// 				},
				// 				{
				// 					title: 'Progressbar',
				// 					page: '/ngbootstrap/progressbar'
				// 				},
				// 				{
				// 					title: 'Rating',
				// 					page: '/ngbootstrap/rating'
				// 				},
				// 				{
				// 					title: 'Tabs',
				// 					page: '/ngbootstrap/tabs'
				// 				},
				// 				{
				// 					title: 'Timepicker',
				// 					page: '/ngbootstrap/timepicker'
				// 				},
				// 				{
				// 					title: 'Tooltips',
				// 					page: '/ngbootstrap/tooltip'
				// 				},
				// 				{
				// 					title: 'Typehead',
				// 					page: '/ngbootstrap/typehead'
				// 				}
				// 			]
				// 		},
				// 	]
				// },
				// {
				// 	title: 'Applications',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	submenu: [
				// 		{
				// 			title: 'eCommerce',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-business',
				// 			permission: 'accessToECommerceModule',
				// 			submenu: [
				// 				{
				// 					title: 'Customers',
				// 					page: '/ecommerce/customers'
				// 				},
				// 				{
				// 					title: 'Products',
				// 					page: '/ecommerce/products'
				// 				},
				// 			]
				// 		},
				// 		{
				// 			title: 'User Management',
				// 			bullet: 'dot',
				// 			icon: 'flaticon-user',
				// 			submenu: [
				// 				{
				// 					title: 'Users',
				// 					page: '/user-management/users'
				// 				},
				// 				{
				// 					title: 'Roles',
				// 					page: '/user-management/roles'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Academic Management',
				// 			bullet: 'dot',
				// 			icon: 'falticon-business',
				// 			submenu: [
				// 				{
				// 					title: 'Class',
				// 					page: '/academic/class'
				// 				}, {
				// 					title: 'Section',
				// 					page: '/academic/section'
				// 				}, {
				// 					title: 'Subject',
				// 					page: '/academic/subject'
				// 				}, {
				// 					title: 'Time Table',
				// 					page: '/academic/time_table'
				// 				}, {
				// 					title: 'Promote Student',
				// 					page: '/academic/promote_student'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Student Management',
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Student Information',
				// 					page: '/student_management/student_info'
				// 				}, {
				// 					title: 'Assign Class',
				// 					page: '/student_management/assign_class'
				// 				}, {
				// 					title: 'Parent Information',
				// 					page: '/student_management/parent_info'
				// 				}, {
				// 					title: 'Student Contact Information',
				// 					page: '/student_management/student_contact_info'
				// 				}
				// 			]
				// 		}
				// 	]
				// },

				// {
				// 	title: 'Custom',
				// 	root: true,
				// 	alignment: 'left',
				// 	toggle: 'click',
				// 	submenu: [
				// 		{
				// 			title: 'Error Pages',
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Error 1',
				// 					page: '/error/error-v1'
				// 				},
				// 				{
				// 					title: 'Error 2',
				// 					page: '/error/error-v2'
				// 				},
				// 				{
				// 					title: 'Error 3',
				// 					page: '/error/error-v3'
				// 				},
				// 				{
				// 					title: 'Error 4',
				// 					page: '/error/error-v4'
				// 				},
				// 				{
				// 					title: 'Error 5',
				// 					page: '/error/error-v5'
				// 				},
				// 				{
				// 					title: 'Error 6',
				// 					page: '/error/error-v6'
				// 				},
				// 			]
				// 		},
				// 		{
				// 			title: 'Accounts Management',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Submit Fees',
				// 					page: '/accounts_management/submit_fees'
				// 				}, {
				// 					title: 'Fees Discount',
				// 					page: '/accounts_management/fees_discount'
				// 				}, {
				// 					title: 'Employee Salary',
				// 					page: '/accounts_management/employee_salary'
				// 				}, {
				// 					title: 'Fees Template',
				// 					page: '/accounts_management/fees_template'
				// 				}, {
				// 					title: 'Fees Type',
				// 					page: '/accounts_management/fees_type'
				// 				}
				// 			]
				// 		},

				// 		{
				// 			title: 'General Setup',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Institutes',
				// 					page: '/general_setup/institutes'
				// 				}, {
				// 					title: 'City',
				// 					page: '/general_setup/city'
				// 				}, {
				// 					title: 'State',
				// 					page: '/general_setup/state'
				// 				}, {
				// 					title: 'Country',
				// 					page: '/general_setup/country'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Exam Management',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Exam Setup',
				// 					page: '/exam_management/exam_setup'
				// 				}, {
				// 					title: 'Exam Grade',
				// 					page: '/exam_management/exam_grade'
				// 				}, {
				// 					title: 'Exam Reports',
				// 					page: '/exam_management/exam_reports'
				// 				}, {
				// 					title: 'Marks Setup',
				// 					page: '/exam_management/marks_setup'
				// 				}, {
				// 					title: 'Exam Schedule',
				// 					page: '/exam_management/exam_schedule'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Library Management',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Book Entry',
				// 					page: '/library_management/book_entry'
				// 				}, {
				// 					title: 'Book Supplier',
				// 					page: '/library_management/book_supplier_entry'
				// 				}, {
				// 					title: 'Book Issue',
				// 					page: '/library_management/book_issue'
				// 				}, {
				// 					title: 'MBook Return',
				// 					page: '/library_management/book_return'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Transport Management',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Vehicle',
				// 					page: '/transport_management/vehicle'
				// 				}, {
				// 					title: 'Vehicle Route',
				// 					page: '/transport_management/vehicle_route'
				// 				}, {
				// 					title: 'Vehicle Assign',
				// 					page: '/transport_management/vehicle_assign'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'HR Management',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Department',
				// 					page: '/hr_management/department'
				// 				}, {
				// 					title: 'Designation',
				// 					page: '/hr_management/designation'
				// 				}, {
				// 					title: 'Employee',
				// 					page: '/hr_management/employee'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Event Management',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Event Info',
				// 					page: '/event_management/event_info'
				// 				}, {
				// 					title: 'Event Schedule',
				// 					page: '/event_management/event_schedule'
				// 				}, {
				// 					title: 'Event Awards',
				// 					page: '/event_management/event_awards'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Hostel Management',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Hostels',
				// 					page: '/hostel_management/hostels'
				// 				}, {
				// 					title: 'Room Type',
				// 					page: '/hostel_management/room_type'
				// 				}, {
				// 					title: 'Rooms',
				// 					page: '/hostel_management/rooms'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Home Work',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-list-2',
				// 			submenu: [
				// 				{
				// 					title: 'Home Work',
				// 					page: '/home_work_management/home_work'
				// 				}, {
				// 					title: 'Assign Home Work',
				// 					page: '/home_work_management/assign'
				// 				}, {
				// 					title: 'Home Work Status',
				// 					page: '/home_work_management/status'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Academic management',
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-mail-1',
				// 			submenu: [
				// 				{
				// 					title: 'Wizard 1',
				// 					page: '/wizard/wizard-1'
				// 				},
				// 				{
				// 					title: 'Wizard 2',
				// 					page: '/wizard/wizard-2'
				// 				},
				// 				{
				// 					title: 'Wizard 3',
				// 					page: '/wizard/wizard-3'
				// 				},
				// 				{
				// 					title: 'Wizard 4',
				// 					page: '/wizard/wizard-4'
				// 				},
				// 			]
				// 		},
				// 	]
				// },
			]
		},
		aside: {
			self: {},

			/*
			Side Bar Starts from here
			*/
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				// {
				// 	title: 'Layout Builder',
				// 	root: true,
				// 	icon: 'flaticon2-expand',
				// 	page: '/builder'
				// },
				// { section: 'Components' },
				// {
				// 	title: 'Google Material',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-browser-2',
				// 	submenu: [
				// 		{
				// 			title: 'Form Controls',
				// 			bullet: 'dot',
				// 			submenu: [
				// 				{
				// 					title: 'Auto Complete',
				// 					page: '/material/form-controls/autocomplete',
				// 					permission: 'accessToECommerceModule'
				// 				},
				// 				{
				// 					title: 'Checkbox',
				// 					page: '/material/form-controls/checkbox'
				// 				},
				// 				{
				// 					title: 'Radio Button',
				// 					page: '/material/form-controls/radiobutton'
				// 				},
				// 				{
				// 					title: 'Datepicker',
				// 					page: '/material/form-controls/datepicker'
				// 				},
				// 				{
				// 					title: 'Form Field',
				// 					page: '/material/form-controls/formfield'
				// 				},
				// 				{
				// 					title: 'Input',
				// 					page: '/material/form-controls/input'
				// 				},
				// 				{
				// 					title: 'Select',
				// 					page: '/material/form-controls/select'
				// 				},
				// 				{
				// 					title: 'Slider',
				// 					page: '/material/form-controls/slider'
				// 				},
				// 				{
				// 					title: 'Slider Toggle',
				// 					page: '/material/form-controls/slidertoggle'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Navigation',
				// 			bullet: 'dot',
				// 			submenu: [
				// 				{
				// 					title: 'Menu',
				// 					page: '/material/navigation/menu'
				// 				},
				// 				{
				// 					title: 'Sidenav',
				// 					page: '/material/navigation/sidenav'
				// 				},
				// 				{
				// 					title: 'Toolbar',
				// 					page: '/material/navigation/toolbar'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Layout',
				// 			bullet: 'dot',
				// 			submenu: [
				// 				{
				// 					title: 'Card',
				// 					page: '/material/layout/card'
				// 				},
				// 				{
				// 					title: 'Divider',
				// 					page: '/material/layout/divider'
				// 				},
				// 				{
				// 					title: 'Expansion panel',
				// 					page: '/material/layout/expansion-panel'
				// 				},
				// 				{
				// 					title: 'Grid list',
				// 					page: '/material/layout/grid-list'
				// 				},
				// 				{
				// 					title: 'List',
				// 					page: '/material/layout/list'
				// 				},
				// 				{
				// 					title: 'Tabs',
				// 					page: '/material/layout/tabs'
				// 				},
				// 				{
				// 					title: 'Stepper',
				// 					page: '/material/layout/stepper'
				// 				},
				// 				{
				// 					title: 'Default Forms',
				// 					page: '/material/layout/default-forms'
				// 				},
				// 				{
				// 					title: 'Tree',
				// 					page: '/material/layout/tree'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Buttons & Indicators',
				// 			bullet: 'dot',
				// 			submenu: [
				// 				{
				// 					title: 'Button',
				// 					page: '/material/buttons-and-indicators/button'
				// 				},
				// 				{
				// 					title: 'Button toggle',
				// 					page: '/material/buttons-and-indicators/button-toggle'
				// 				},
				// 				{
				// 					title: 'Chips',
				// 					page: '/material/buttons-and-indicators/chips'
				// 				},
				// 				{
				// 					title: 'Icon',
				// 					page: '/material/buttons-and-indicators/icon'
				// 				},
				// 				{
				// 					title: 'Progress bar',
				// 					page: '/material/buttons-and-indicators/progress-bar'
				// 				},
				// 				{
				// 					title: 'Progress spinner',
				// 					page: '/material/buttons-and-indicators/progress-spinner'
				// 				},
				// 				{
				// 					title: 'Ripples',
				// 					page: '/material/buttons-and-indicators/ripples'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Popups & Modals',
				// 			bullet: 'dot',
				// 			submenu: [
				// 				{
				// 					title: 'Bottom sheet',
				// 					page: '/material/popups-and-modals/bottom-sheet'
				// 				},
				// 				{
				// 					title: 'Dialog',
				// 					page: '/material/popups-and-modals/dialog'
				// 				},
				// 				{
				// 					title: 'Snackbar',
				// 					page: '/material/popups-and-modals/snackbar'
				// 				},
				// 				{
				// 					title: 'Tooltip',
				// 					page: '/material/popups-and-modals/tooltip'
				// 				}
				// 			]
				// 		},
				// 		{
				// 			title: 'Data table',
				// 			bullet: 'dot',
				// 			submenu: [
				// 				{
				// 					title: 'Paginator',
				// 					page: '/material/data-table/paginator'
				// 				},
				// 				{
				// 					title: 'Sort header',
				// 					page: '/material/data-table/sort-header'
				// 				},
				// 				{
				// 					title: 'Table',
				// 					page: '/material/data-table/table'
				// 				}
				// 			]
				// 		}
				// 	]
				// },
				// {
				// 	title: 'Ng-Bootstrap',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-digital-marketing',
				// 	submenu: [
				// 		{
				// 			title: 'Accordion',
				// 			page: '/ngbootstrap/accordion'
				// 		},
				// 		{
				// 			title: 'Alert',
				// 			page: '/ngbootstrap/alert'
				// 		},
				// 		{
				// 			title: 'Buttons',
				// 			page: '/ngbootstrap/buttons'
				// 		},
				// 		{
				// 			title: 'Carousel',
				// 			page: '/ngbootstrap/carousel'
				// 		},
				// 		{
				// 			title: 'Collapse',
				// 			page: '/ngbootstrap/collapse'
				// 		},
				// 		{
				// 			title: 'Datepicker',
				// 			page: '/ngbootstrap/datepicker'
				// 		},
				// 		{
				// 			title: 'Dropdown',
				// 			page: '/ngbootstrap/dropdown'
				// 		},
				// 		{
				// 			title: 'Modal',
				// 			page: '/ngbootstrap/modal'
				// 		},
				// 		{
				// 			title: 'Pagination',
				// 			page: '/ngbootstrap/pagination'
				// 		},
				// 		{
				// 			title: 'Popover',
				// 			page: '/ngbootstrap/popover'
				// 		},
				// 		{
				// 			title: 'Progressbar',
				// 			page: '/ngbootstrap/progressbar'
				// 		},
				// 		{
				// 			title: 'Rating',
				// 			page: '/ngbootstrap/rating'
				// 		},
				// 		{
				// 			title: 'Tabs',
				// 			page: '/ngbootstrap/tabs'
				// 		},
				// 		{
				// 			title: 'Timepicker',
				// 			page: '/ngbootstrap/timepicker'
				// 		},
				// 		{
				// 			title: 'Tooltips',
				// 			page: '/ngbootstrap/tooltip'
				// 		},
				// 		{
				// 			title: 'Typehead',
				// 			page: '/ngbootstrap/typehead'
				// 		}
				// 	]
				// },
				// { section: 'Applications' },
				// {
				// 	title: 'eCommerce',
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-list-2',
				// 	root: true,
				// 	permission: 'accessToECommerceModule',
				// 	submenu: [
				// 		{
				// 			title: 'Customers',
				// 			page: '/ecommerce/customers'
				// 		},
				// 		{
				// 			title: 'Products',
				// 			page: '/ecommerce/products'
				// 		},
				// 	]
				// },
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-1',
					submenu: [
						{
							title: 'Users',
							page: '/user-management/users'
						},
						{
							title: 'Roles',
							page: '/user-management/roles'
						}
					]
				},
				{
					title: 'General Setup',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-cogwheel-2',
					submenu: [
						{
							title: 'Institutes',
							page: '/general_setup/institutes'
						}, {
							title: 'City',
							page: '/general_setup/city'
						}, {
							title: 'State',
							page: '/general_setup/state'
						}, {
							title: 'Country',
							page: '/general_setup/country'
						}
					]
				},
				{
					title: 'Academic Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Class',
							page: '/academic/class'
						}, {
							title: 'Section',
							page: '/academic/section'
						}, {
							title: 'Subject',
							page: '/academic/subject'
						}, {
							title: 'Time Table',
							page: '/academic/time_table'
						}, {
							title: 'Promote Student',
							page: '/academic/promote_student'
						}
					]
				},
				{
					title: 'Student Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user',
					submenu: [
						{
							title: 'Student Information',
							page: '/student_management/student_info'
						}, {
							title: 'Assign Class',
							page: '/student_management/assign_class'
						}, {
							title: 'Parent Information',
							page: '/student_management/parent_info'
						}, {
							title: 'Student Contact Information',
							page: '/student_management/student_contact_info'
						}
					]
				},
				{
					title: 'Home Work',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-sheet',
					submenu: [
						{
							title: 'Home Work',
							page: '/home_work_management/home_work'
						}, {
							title: 'Assign Home Work',
							page: '/home_work_management/assign'
						}, {
							title: 'Home Work Status',
							page: '/home_work_management/status'
						}
					]
				},
				{
					title: 'Exam Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-copy',
					submenu: [
						{
							title: 'Exam Setup',
							page: '/exam_management/exam_setup'
						}, {
							title: 'Exam Grade',
							page: '/exam_management/exam_grade'
						}, {
							title: 'Exam Reports',
							page: '/exam_management/exam_reports'
						}, {
							title: 'Marks Setup',
							page: '/exam_management/marks_setup'
						}, {
							title: 'Exam Schedule',
							page: '/exam_management/exam_schedule'
						}
					]
				},
				{
					title: 'Accounts Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-line-graph',
					submenu: [
						{
							title: 'Submit Fees',
							page: '/accounts_management/submit_fees'
						}, {
							title: 'Fees Discount',
							page: '/accounts_management/fees_discount'
						}, {
							title: 'Employee Salary',
							page: '/accounts_management/employee_salary'
						}, {
							title: 'Fees Template',
							page: '/accounts_management/fees_template'
						}, {
							title: 'Fees Type',
							page: '/accounts_management/fees_type'
						}
					]
				},
				{
					title: 'HR Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-user-settings',
					submenu: [
						{
							title: 'Department',
							page: '/hr_management/department'
						}, {
							title: 'Designation',
							page: '/hr_management/designation'
						}, {
							title: 'Employee',
							page: '/hr_management/employee'
						}
					]
				},
				{
					title: 'Attendance Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-group',
					submenu: [
						{
							title: 'Student Attendance',
							page: '/hr_management/department'
						}, {
							title: 'Employee Attendance',
							page: '/hr_management/designation'
						},
					]
				},
				{
					title: 'Library Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-book',
					submenu: [
						{
							title: 'Book Entry',
							page: '/library_management/book_entry'
						}, {
							title: 'Book Supplier',
							page: '/library_management/book_supplier_entry'
						}, {
							title: 'Book Issue',
							page: '/library_management/book_issue'
						}, {
							title: 'Book Return',
							page: '/library_management/book_return'
						},
					]
				},
				{
					title: 'Transport Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-lorry',
					submenu: [
						{
							title: 'Vehicle',
							page: '/transport_management/vehicle'
						}, {
							title: 'Vehicle Route',
							page: '/transport_management/vehicle_route'
						}, {
							title: 'Vehicle Assign',
							page: '/transport_management/vehicle_assign'
						}
					]
				},
				{
					title: 'Hostel Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-home-1',
					submenu: [
						{
							title: 'Hostels',
							page: '/hostel_management/hostels'
						},
						{
							title: 'Assign Hostel',
							page: '/hostel_management/assign_hostel'
						},
						{
							title: 'Manage Assign Hostel',
							page: '/hostel_management/manage_assign_hostel'
						},
						{
							title: 'Hostels',
							page: '/hostel_management/hostels'
						}, {
							title: 'Room Type',
							page: '/hostel_management/room_type'
						}, {
							title: 'Rooms',
							page: '/hostel_management/rooms'
						}
					]
				},
				{
					title: 'Event Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-time-3',
					submenu: [
						{
							title: 'Event Info',
							page: '/event_management/event_info'
						}, {
							title: 'Event Schedule',
							page: '/event_management/event_schedule'
						}, {
							title: 'Event Awards',
							page: '/event_management/event_awards'
						}
					]
				},
				{
					title: 'Report',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-interface-4',
					submenu: [
						{
							title: 'Report 1',
							page: '/report1/report'
						}, {
							title: 'Report 2',
							page: '/report2/report'
						}, {
							title: 'Report 3',
							page: 'report3/report3'
						}
					]
				},
				{
					title: 'Advance Search',
					root: true,
					bullet: 'dot',
					icon: 'flaticon-search',
					submenu: [
						{
							title: 'Marksheet Search',
							page: '/advance_search/marksheet'
						}, 
						// {
						// 	title: 'Search2',
						// 	page: '/advance_search/teacher_search'
						// }, {
						// 	title: 'Search 3',
						// 	page: '/advance_search/any_search'
						// }
					]
				},
				/*
				Side Bar ends here
				*/


				// { section: 'Custom' },
				// {
				// 	title: 'Error Pages',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-list-2',
				// 	submenu: [
				// 		{
				// 			title: 'Error 1',
				// 			page: '/error/error-v1'
				// 		},
				// 		{
				// 			title: 'Error 2',
				// 			page: '/error/error-v2'
				// 		},
				// 		{
				// 			title: 'Error 3',
				// 			page: '/error/error-v3'
				// 		},
				// 		{
				// 			title: 'Error 4',
				// 			page: '/error/error-v4'
				// 		},
				// 		{
				// 			title: 'Error 5',
				// 			page: '/error/error-v5'
				// 		},
				// 		{
				// 			title: 'Error 6',
				// 			page: '/error/error-v6'
				// 		},
				// 	]
				// },
				{
					title: 'Wizard',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-mail-1',
					submenu: [
						{
							title: 'Wizard 1',
							page: '/wizard/wizard-1'
						},
						{
							title: 'Wizard 2',
							page: '/wizard/wizard-2'
						},
						{
							title: 'Wizard 3',
							page: '/wizard/wizard-3'
						},
						{
							title: 'Wizard 4',
							page: '/wizard/wizard-4'
						},
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
