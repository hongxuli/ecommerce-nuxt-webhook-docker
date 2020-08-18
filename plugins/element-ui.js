import Vue from "vue";
import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import {
  Table,
  TableColumn,
  Select,
  Option,
  Autocomplete,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Rate,
  Carousel,
  CarouselItem,
  Card,
  Row,
  Col,
  Icon,
  Input,
  Container,
  Header,
  Main,
  Footer,
  Checkbox,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Pagination
} from "element-ui";

const listOfComponent = [
  Table,
  TableColumn,
  Select,
  Option,
  Autocomplete,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Rate,
  Carousel,
  CarouselItem,
  Card,
  Row,
  Col,
  Icon,
  Input,
  Container,
  Header,
  Main,
  Footer,
  Checkbox,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Pagination
];

const init = function(listOfComponent) {
  listOfComponent.forEach(Component => {
    Vue.use(Component);
  });
};

init(listOfComponent);

// Vue.use(Element, { locale })
