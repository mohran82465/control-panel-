import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PopoverModule } from 'primeng/popover';


@Component({
  selector: 'app-product',
  imports: [ButtonModule, DialogModule, TableModule,PopoverModule],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product {
  products = [
    {
      id: "1111",
      name: 'Pizza ranch',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad dolorem quo facilis ab quaerat vitae, temporibus explicabo, possimus blanditiis, delectus nemo? Voluptates deleniti in temporibus, at libero laborum atque asperiores.
Voluptate assumenda rem temporibus inventore dolore quos? Repudiandae, quaerat ducimus cum deleniti eos unde molestiae quisquam quis magnam praesentium! Delectus corrupti, perspiciatis quis magnam dolorum aut saepe maiores vero ipsa!
Sit, nihil. Doloribus molestias similique perspiciatis esse voluptatum, aliquam laborum fuga exercitationem illo, sit laudantium incidunt aperiam quis, iste porro nisi! Eveniet, et nobis facere amet consequatur modi dolor exercitationem.
Esse ad error quos consequuntur quas explicabo, illo quibusdam, dolor eveniet provident aliquam? Ab, ut totam quo dignissimos sequi sed maiores iure dolore similique? Quaerat optio facere sapiente illum cupiditate.
Pariatur, numquam! Earum maiores laborum impedit odio rerum exercitationem fugiat obcaecati adipisci mollitia non necessitatibus, sapiente vitae facere reprehenderit assumenda, accusantium laboriosam libero placeat, explicabo illo alias pariatur! Dicta, quibusdam.
Amet similique placeat sed nemo quisquam fuga, doloremque ducimus. Iusto eveniet incidunt hic illum aliquid sunt, vero animi neque sequi ea iure suscipit totam natus! Reiciendis, iure sit. Quasi, doloribus?
Commodi, quam accusantium. Eum quis illum odit et doloribus aperiam amet consequatur. Praesentium excepturi sint, quia deleniti consequuntur ducimus fugiat libero neque in labore, qui nesciunt vero quaerat nobis quibusdam!
Fuga ducimus culpa recusandae at explicabo cum alias unde dolorem facilis nemo? Necessitatibus iusto suscipit culpa error totam laboriosam tenetur modi ab, laudantium sed, quidem molestiae numquam! Accusamus, laborum ducimus?
Necessitatibus ea ab sed atque consectetur, in dignissimos mollitia ex voluptas laudantium ipsum commodi ducimus consequuntur, quasi iusto minima. Quam aspernatur fugit odit eligendi excepturi tempore doloremque voluptate, eius quasi!
Commodi, adipisci cumque a necessitatibus asperiores cum porro quam itaque ipsa earum! Ipsa soluta similique libero quas esse illo pariatur porro fugit molestiae sapiente doloremque deserunt velit sit, nulla facere.`,
      images: [
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
      ],
      price: 50,
      discount: 10,
      restaurant: "Pizza Palace"
    },
    {
      id: "2222",
      name: 'sushi sashimi',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad dolorem quo facilis ab quaerat vitae, temporibus explicabo, possimus blanditiis, delectus nemo? Voluptates deleniti in temporibus, at libero laborum atque asperiores.
Voluptate assumenda rem temporibus inventore dolore quos? Repudiandae, quaerat ducimus cum deleniti eos unde molestiae quisquam quis magnam praesentium! Delectus corrupti, perspiciatis quis magnam dolorum aut saepe maiores vero ipsa!
Sit, nihil. Doloribus molestias similique perspiciatis esse voluptatum, aliquam laborum fuga exercitationem illo, sit laudantium incidunt aperiam quis, iste porro nisi! Eveniet, et nobis facere amet consequatur modi dolor exercitationem.
Esse ad error quos consequuntur quas explicabo, illo quibusdam, dolor eveniet provident aliquam? Ab, ut totam quo dignissimos sequi sed maiores iure dolore similique? Quaerat optio facere sapiente illum cupiditate.
Pariatur, numquam! Earum maiores laborum impedit odio rerum exercitationem fugiat obcaecati adipisci mollitia non necessitatibus, sapiente vitae facere reprehenderit assumenda, accusantium laboriosam libero placeat, explicabo illo alias pariatur! Dicta, quibusdam.
Amet similique placeat sed nemo quisquam fuga, doloremque ducimus. Iusto eveniet incidunt hic illum aliquid sunt, vero animi neque sequi ea iure suscipit totam natus! Reiciendis, iure sit. Quasi, doloribus?
Commodi, quam accusantium. Eum quis illum odit et doloribus aperiam amet consequatur. Praesentium excepturi sint, quia deleniti consequuntur ducimus fugiat libero neque in labore, qui nesciunt vero quaerat nobis quibusdam!
Fuga ducimus culpa recusandae at explicabo cum alias unde dolorem facilis nemo? Necessitatibus iusto suscipit culpa error totam laboriosam tenetur modi ab, laudantium sed, quidem molestiae numquam! Accusamus, laborum ducimus?
Necessitatibus ea ab sed atque consectetur, in dignissimos mollitia ex voluptas laudantium ipsum commodi ducimus consequuntur, quasi iusto minima. Quam aspernatur fugit odit eligendi excepturi tempore doloremque voluptate, eius quasi!
Commodi, adipisci cumque a necessitatibus asperiores cum porro quam itaque ipsa earum! Ipsa soluta similique libero quas esse illo pariatur porro fugit molestiae sapiente doloremque deserunt velit sit, nulla facere.`,
      images: [
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
        { url: 'https://placehold.co/600x400' },
      ],
      price: 50,
      discount: 10,
      resturant: "Sushi World"
    }
  ]

  showImages(images: { url: string }[]) {
    console.log("Show dialog with images:", images);
    // You can trigger your <p-dialog> here
  }
}
