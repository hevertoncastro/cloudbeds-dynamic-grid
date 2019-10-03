import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Group from '@/components/Group.vue';

describe('Group.vue', () => {
  it('renders props.id when passed', () => {
    const id = 'group-x1-y01';
    const wrapper = shallowMount(Group, {
      propsData: { id },
    });
    expect(wrapper.text()).to.include(id);
  });
});
