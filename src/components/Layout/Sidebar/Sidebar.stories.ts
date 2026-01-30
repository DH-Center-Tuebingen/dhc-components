import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import Sidebar from './Sidebar.vue';



const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  args: {
    options: {
      minWidth: '300px',
      maxExtend: '60%',
    }
  },
  render: (args) => ({
    components: { Sidebar },
    setup() {
      return { args };
    },
    template: `
    <div class="d-flex position-relative bg-white">
      <div class="p-4 flex-grow-1 bg-warning overflow-y-auto">
      <h1>Main Content</h1>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
<br>
Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
<br>
Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
<br>
Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
<br>
Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.
<br>
At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
<br>
Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.
<br>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
<br>
Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
<br>
Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </div>
        <Sidebar :options="args.options">
        <div class="m-4">
         <h1>Sidebar</h1>
          <p>
              Ut excepteur labore sit fugiat cillum anim consequat excepteur voluptate incididunt aliqua et. Reprehenderit laborum veniam adipisicing mollit excepteur veniam eu laborum cupidatat ipsum aliqua dolor nulla. Do amet do esse id ullamco. Dolor commodo adipisicing quis laboris sint. Lorem ut enim officia labore consectetur labore labore enim irure magna commodo. Dolor velit ipsum cillum do sint culpa.

              Aliqua velit reprehenderit consequat esse deserunt ut ipsum laborum do quis non culpa qui ipsum. Mollit incididunt minim id in proident esse duis anim eu voluptate. Qui pariatur consequat qui pariatur aute reprehenderit dolore laboris dolor. Non cupidatat officia ea cillum. Est laborum Lorem deserunt eiusmod esse id sit fugiat. Est enim laboris nulla ullamco incididunt nostrud eu. Veniam voluptate commodo Lorem enim est irure duis labore nostrud eu aute sint id ea.

              Occaecat consequat nulla ut veniam in adipisicing Lorem laborum officia eiusmod quis quis id ea. Laborum aute enim aliqua nostrud occaecat dolore. Sint nisi consequat officia tempor qui qui. In cupidatat aute duis in ipsum. Non aute ex exercitation aliquip in eiusmod nulla labore id mollit adipisicing aute tempor. Amet Lorem Lorem labore dolor nulla voluptate amet ex.
          </p>
          <p>
              Ut excepteur labore sit fugiat cillum anim consequat excepteur voluptate incididunt aliqua et. Reprehenderit laborum veniam adipisicing mollit excepteur veniam eu laborum cupidatat ipsum aliqua dolor nulla. Do amet do esse id ullamco. Dolor commodo adipisicing quis laboris sint. Lorem ut enim officia labore consectetur labore labore enim irure magna commodo. Dolor velit ipsum cillum do sint culpa.

              Aliqua velit reprehenderit consequat esse deserunt ut ipsum laborum do quis non culpa qui ipsum. Mollit incididunt minim id in proident esse duis anim eu voluptate. Qui pariatur consequat qui pariatur aute reprehenderit dolore laboris dolor. Non cupidatat officia ea cillum. Est laborum Lorem deserunt eiusmod esse id sit fugiat. Est enim laboris nulla ullamco incididunt nostrud eu. Veniam voluptate commodo Lorem enim est irure duis labore nostrud eu aute sint id ea.

              Occaecat consequat nulla ut veniam in adipisicing Lorem laborum officia eiusmod quis quis id ea. Laborum aute enim aliqua nostrud occaecat dolore. Sint nisi consequat officia tempor qui qui. In cupidatat aute duis in ipsum. Non aute ex exercitation aliquip in eiusmod nulla labore id mollit adipisicing aute tempor. Amet Lorem Lorem labore dolor nulla voluptate amet ex.
          </p>
          <p>
              Ut excepteur labore sit fugiat cillum anim consequat excepteur voluptate incididunt aliqua et. Reprehenderit laborum veniam adipisicing mollit excepteur veniam eu laborum cupidatat ipsum aliqua dolor nulla. Do amet do esse id ullamco. Dolor commodo adipisicing quis laboris sint. Lorem ut enim officia labore consectetur labore labore enim irure magna commodo. Dolor velit ipsum cillum do sint culpa.

              Aliqua velit reprehenderit consequat esse deserunt ut ipsum laborum do quis non culpa qui ipsum. Mollit incididunt minim id in proident esse duis anim eu voluptate. Qui pariatur consequat qui pariatur aute reprehenderit dolore laboris dolor. Non cupidatat officia ea cillum. Est laborum Lorem deserunt eiusmod esse id sit fugiat. Est enim laboris nulla ullamco incididunt nostrud eu. Veniam voluptate commodo Lorem enim est irure duis labore nostrud eu aute sint id ea.

              Occaecat consequat nulla ut veniam in adipisicing Lorem laborum officia eiusmod quis quis id ea. Laborum aute enim aliqua nostrud occaecat dolore. Sint nisi consequat officia tempor qui qui. In cupidatat aute duis in ipsum. Non aute ex exercitation aliquip in eiusmod nulla labore id mollit adipisicing aute tempor. Amet Lorem Lorem labore dolor nulla voluptate amet ex.
          </p>
          </div>
        </Sidebar>
      </div>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Dynamic: Story = {
  play: async ({ canvas }) => {
    const node = await canvas.findByText('Sidebar');
    expect(node).toBeVisible();

    const yourContent = await canvas.findByText('Main Content');
    expect(yourContent).toBeInTheDocument();

    canvas.getByRole('button').click();
    await waitFor(() => expect(node).not.toBeVisible());

    canvas.getByRole('button').click();
    await waitFor(() => expect(node).toBeVisible());
  }
};
